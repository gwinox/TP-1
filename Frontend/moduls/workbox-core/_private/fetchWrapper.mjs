/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {WorkboxError} from './WorkboxError.mjs';
import {logger} from './logger.mjs';
import {assert} from './assert.mjs';
import {getFriendlyURL} from '../_private/getFriendlyURL.mjs';
import {pluginEvents} from '../models/pluginEvents.mjs';
import {pluginUtils} from '../utils/pluginUtils.mjs';
import '../_version.mjs';

/**
 * Wrapper around the fetch API.
 *
 * Will call requestWillFetch on available plugins.
 *
 * @param {Object} options
 * @param {Request|string} options.request
 * @param {Object} [options.fetchOptions]
 * @param {Event} [options.event]
 * @param {Array<Object>} [options.plugins=[]]
 * @return {Promise<Response>}
 *
 * @private
 * @memberof module:workbox-core
 */
const wrappedFetch = async ({
  request,
  fetchOptions,
  event,
  plugins = []}) => {
  // We *should* be able to call `await event.preloadResponse` even if it's
  // undefined, but for some reason, doing so leads to errors in our Node unit
  // tests. To work around that, explicitly check preloadResponse's value first.
  if (event && event.preloadResponse) {
    const possiblePreloadResponse = await event.preloadResponse;
    if (possiblePreloadResponse) {
      if (process.env.NODE_ENV !== 'production') {
        logger.log(`Using a preloaded navigation response for ` +
          `'${getFriendlyURL(request.url)}'`);
      }
      return possiblePreloadResponse;
    }
  }

  if (typeof request === 'string') {
    request = new Request(request);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert.isInstance(request, Request, {
      paramName: request,
      expectedClass: 'Request',
      moduleName: 'workbox-core',
      className: 'fetchWrapper',
      funcName: 'wrappedFetch',
    });
  }

  const failedFetchPlugins = pluginUtils.filter(
      plugins, pluginEvents.FETCH_DID_FAIL);

  // If there is a fetchDidFail plugin, we need to save a clone of the
  // original request before it's either modified by a requestWillFetch
  // plugin or before the original request's body is consumed via fetch().
  const originalRequest = failedFetchPlugins.length > 0 ?
    request.clone() : null;

  try {
    for (let plugin of plugins) {
      if (pluginEvents.REQUEST_WILL_FETCH in plugin) {
        request = await plugin[pluginEvents.REQUEST_WILL_FETCH].call(plugin, {
          request: request.clone(),
          event,
        });

        if (process.env.NODE_ENV !== 'production') {
          if (request) {
            assert.isInstance(request, Request, {
              moduleName: 'Plugin',
              funcName: pluginEvents.CACHED_RESPONSE_WILL_BE_USED,
              isReturnValueProblem: true,
            });
          }
        }
      }
    }
  } catch (err) {
    throw new WorkboxError('plugin-error-request-will-fetch', {
      thrownError: err,
    });
  }

  // The request can be altered by plugins with `requestWillFetch` making
  // the original request (Most likely from a `fetch` event) to be different
  // to the Request we make. Pass both to `fetchDidFail` to aid debugging.
  let pluginFilteredRequest = request.clone();

  try {
    let fetchResponse;

    // See https://github.com/GoogleChrome/workbox/issues/1796
    if (request.mode === 'navigate') {
      fetchResponse = await fetch(request);
    } else {
      fetchResponse = await fetch(request, fetchOptions);
    }

    if (process.env.NODE_ENV !== 'production') {
      logger.debug(`Network request for `+
      `'${getFriendlyURL(request.url)}' returned a response with ` +
      `status '${fetchResponse.status}'.`);
    }

    for (const plugin of plugins) {
      if (pluginEvents.FETCH_DID_SUCCEED in plugin) {
        fetchResponse = await plugin[pluginEvents.FETCH_DID_SUCCEED]
            .call(plugin, {
              event,
              request: pluginFilteredRequest,
              response: fetchResponse,
            });

        if (process.env.NODE_ENV !== 'production') {
          if (fetchResponse) {
            assert.isInstance(fetchResponse, Response, {
              moduleName: 'Plugin',
              funcName: pluginEvents.FETCH_DID_SUCCEED,
              isReturnValueProblem: true,
            });
          }
        }
      }
    }

    return fetchResponse;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      logger.error(`Network request for `+
      `'${getFriendlyURL(request.url)}' threw an error.`, error);
    }

    for (const plugin of failedFetchPlugins) {
      await plugin[pluginEvents.FETCH_DID_FAIL].call(plugin, {
        error,
        event,
        originalRequest: originalRequest.clone(),
        request: pluginFilteredRequest.clone(),
      });
    }

    throw error;
  }
};

const fetchWrapper = {
  fetch: wrappedFetch,
};

export {fetchWrapper};
