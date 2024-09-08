import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Header from "../components/Header";
import Info from "../components/info";
import FormP from "../components/FormP";
import Place from "../components/place";
import Footer from "../components/Footer";
import {useDispatch} from 'react-redux'
import { useAuth } from '../hooks/use-auth';
import {removeUser} from '../slices/userSlice'

const API_KEY = "e5832fe7fa724f039e8a644e5697a808";

function Home() {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();
  const [currentForm, setCurrentForm] = useState("login");
  const [state, setState] = useState({
    temp: undefined,
    ip: undefined,
    city: undefined,
    country_name: undefined,
    state_prov: undefined,
    hostname: undefined,
    error: undefined,
  });

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const gettingPlace = async (e) => {
    e.preventDefault();
    const Ip = e.target.elements.ip.value;
    const api_url = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${Ip}`
    );
    const data = await api_url.json();
    console.log(data);

    if (Ip) {
      setState({
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
      {isAuth ? (
        <div className="App">
          <Header />
          <Info />
          <Footer />
          {currentForm === "login" ? (
            <LoginPage onFormSwitch={toggleForm} />
          ) : (
            <RegisterPage onFormSwitch={toggleForm} />
          )}
          <FormP placeIp={gettingPlace} />
          <Place
            ip={state.ip}
            city={state.city}
            country_name={state.country_name}
            state_prov={state.state_prov}
            hostname={state.hostname}
            error={state.error}
          />
          <button onClick={() => dispatch(removeUser())}>
            Log out from {email}
          </button>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Home;
