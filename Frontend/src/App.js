import React from 'react';
import "./App.css";
import SignUp from "./components/auth/SignUp"; 
import SignIn from "./components/auth/SignIn"; 
import AuthDetails from "./components/auth/AuthDetails"; 
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <SignUp />
      <SignIn />
      <AuthDetails />
      <HomePage />
    </div>
  );
}

export default App;