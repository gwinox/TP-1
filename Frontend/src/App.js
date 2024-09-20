import React, { useState } from 'react';
import "./App.css";
import SignUp from "./components/auth/SignUp"; 
import SignIn from "./components/auth/SignIn"; 
import AuthDetails from "./components/auth/AuthDetails"; 
import HomePage from "./pages/HomePage";
import axios from 'axios';

function App() {

  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/iplocation/iplocation/', { input_data: input }); // {input_data:input}
      setResult(response.data);
      setError(null);  // Clear previous errors
    } 
    catch (err) {
      setError('Could not process the IP address. Make sure it is a valid IP address or domain name.');
      setResult(null);  // Clear previous results
    }
  };

  return (
    <div className="App">
      <SignUp />
      <SignIn />
      <AuthDetails />
      <HomePage />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter IP address or domain name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div class="source">
          <p>Date: {new Date(result.query_date).toLocaleString()}</p>
          <p>Source 1: {result.lat1}, {result.lon1} </p>
          <p>Source 2: {result.lat2}, {result.lon2} </p>
          <p>Source 3: {result.lat3}, {result.lon3} </p>
        </div>
      )}
    </div>
  );
}

export default App;