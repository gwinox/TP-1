import React from "react";
import Info from "./components/info.js"
import Form from "./components/form.js"
import Place from "./components/place.js"
import Footer from "./components/Footer.js"
import AxiosInstance from "./components/Axios.js";
import axios from 'axios'

const API_KEY = "e5832fe7fa724f039e8a644e5697a808";

class App extends React.Component {

  state = {
    temp: undefined,
    ip: undefined,
    city: undefined,
    country_name: undefined,
    state_prov: undefined,
    hostname: undefined,
    error: undefined,
    details: [],
  }

  componentDidMount() 
  {
    let data;
    axios.get('http://localhost:8000')
      .then(res => {
        data = res.data;
        this.setState({
          details: data
        });
      })
      .catch(err => { })
  }

  // render() {
  //   return (
  //     <div>
  //       <header>Data from Django</header>
  //       <hr></hr>
  //       {this.state.details.map((output, id)=> (
  //         <div key={id}>
  //           <div>
  //             <h2>{output.ip}</h2>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   )
  // }

  gettingPlace = async (e) => {
    e.preventDefault();
    const Ip = e.target.elements.ip.value;
    const api_url = await
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${Ip}&appid`);
    const data = await api_url.json();
    console.log(data);


    if(Ip){
    this.setState({
      ip: data.ip,
      city: data.city,
      country_name: data.country_name,
      state_prov: data.state_prov,
      hostname: data.hostname,
      error:""
    });
  }
}

  render(){
    return (
      <div>
        <header>Data from Django</header>
        <hr></hr>
        {this.state.details.map((output, id)=> (
          <div key={id}>
            <div>
              <h2>{output.ip}</h2>
            </div>
          </div>
        ))}

        <Info/>
        <Footer/>
        <Form placeIp={this.gettingPlace}/>
        <Place
          ip={this.state.ip}
          city={this.state.city}
          country_name={this.state.country_name}
          state_prov={this.state.state_prov}
          hostname={this.state.hostname}
          error={this.state.error}
         />
      </div>
    );
  }
}

export default App;
