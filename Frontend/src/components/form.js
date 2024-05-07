import React from "react";

class Form extends React.Component {
  render(){
    return(
      <form onSubmit={this.props.placeIp}>
        <input type="text" name="ip" placeholder="Ip"/>
        <button>Получить местоположение</button>
      </form>
    );
  }
}

export default Form;
