### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

Generated by [`auto-changelog`](https://github.com/CookPete/auto-changelog).

#### [v2.2.0](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/compare/v2.1.2...v2.2.0)

> 24 January 2019

- Testing updates [`#37`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/37)
- Use the before emit hook to check if files exist [`#36`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/36)
- Update for Node 4 use to prevent major semver bump [`e400f17`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/commit/e400f177f2414e183f03c271f9683a2006ee3f1e)
- Start using AutoChangelog [`c2b6ca1`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/commit/c2b6ca1f271dbac1565f27ab4be2a3f2712eea28)
- Remove Node 4 from Travis test as it is flaky. [`329d32d`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/commit/329d32d9b4614f73fe121743aeee2dedbf14cae9)

### [v2.1.2](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/compare/1.1.4...v2.1.2)

> 6 March 2018

- Add support for webpack 4 [`#31`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/31)
- Add license scan report and status [`#27`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/27)
- Use compiler filesystem [`#14`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/14)
- Add `files` to `package.json`. [`#15`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/15)
- Update README.md [`#13`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/13)
- Merge FOSSA's badge [`be74649`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/commit/be74649d64c70f8b79efe25c320e737c2ebef07a)
- Release 2.1.0 - No longer return our own error on file not found. [`fb1d636`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/commit/fb1d63653bdc83edc25aada8b8022a4d12fa330a)
- Testing improvements. [`2abbfce`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/commit/2abbfce8f963b48ad596f6f46065575216abd6a5)

#### 1.1.4

> 6 September 2016

- Don't crash on folder deletion with tests [`#10`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/10)
- Normalize filenames to default Unicode Normalization Form (NFC) so th… [`#6`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/6)
- Working E2E Tests in a Demo Project [`#4`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/4)
- check for windows-style root paths [`#2`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/pull/2)
- Create a working React/Webpack project, with Jasmine unit tests that demonstrate the functionality of the plugin. [`de4c1e5`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/commit/de4c1e5cb9d7e8bcc229876735236c0043f5fdeb)
- Initial Code [`bb1d65b`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/commit/bb1d65b0f7b1240a06e1f873ebf5a45f06b7d5bb)
- Drastically reduce filesystem operations required, release v1.1.0 [`ca03460`](https://github.com/Urthen/case-sensitive-paths-webpack-plugin/commit/ca034602148adc7617e1edc39e7931f35de865b5)