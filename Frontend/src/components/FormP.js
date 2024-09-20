import React from "react";


class FormP extends React.Component {
  render(){
    return(
      <form onSubmit={this.props.placeIp}>
        <input type="text" name="ip" placeholder="Ip"/>
        <button>Получить местоположение</button>
      </form>
    );
  }
}

export default FormP;