import React from "react";

class Place extends React.Component {
  render(){
    return(
      <div>
      {this.props.city &&
        <div>
        <p>ip: {this.props.ip}</p>
        <p>hostname: {this.props.hostname}</p>
        <p>страна: {this.props.country_name}</p>
        <p>Местоположениe: {this.props.city} {this.props.state_prov}</p>
        </div>
      }
      </div>
    );
  }
}

export default Place;
