import React, { useState } from 'react';
import Header from '../components/Header';
import Info from '../components/info';
import FormP from '../components/FormP';
import Place from '../components/place';
import Footer from '../components/Footer';

const API_KEY = 'e5832fe7fa724f039e8a644e5697a808';

function Home({ isAuth }) {
  const [state, setState] = useState({
    temp: undefined,
    ip: undefined,
    city: undefined,
    country_name: undefined,
    state_prov: undefined,
    hostname: undefined,
    error: undefined,
  });

  const gettingPlace = async (e) => {
    e.preventDefault();
    const Ip = e.target.elements.ip.value;
    const api_url = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${Ip}`);
    const data = await api_url.json();
    console.log(data);

    if (Ip) {
      setState({
        ...state,
        ip: data.ip,
        city: data.city,
        country_name: data.country_name,
        state_prov: data.state_prov,
        hostname: data.hostname,
        error: "",
      });
    }
  };

  return (
    <>
      <div className="App">
        <Header />
        <Info />
        <Footer />
        <FormP placeIp={gettingPlace} />
        <Place
          ip={state.ip}
          city={state.city}
          country_name={state.country_name}
          state_prov={state.state_prov}
          hostname={state.hostname}
          error={state.error}
        />
      </div>
    </>
  );
}

export default Home;