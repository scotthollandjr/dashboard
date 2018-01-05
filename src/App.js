import React, { Component } from 'react';
import Moment from 'react-moment';
import './App.css';
var parseString = require('xml2js').parseString;

class App extends Component {
  constructor() {
    super();
    this.state = {
      weather: '',
      arrivals: [],
      xlm: '',
    };
  }

  componentWillMount() {
    const wunderUrl = "http://api.wunderground.com/api/bea96fe606912426/conditions/q/OR/Portland.json";
    const trimetUrl = "https://developer.trimet.org/ws/V1/arrivals?locIDs=631&appID=16AEE81C9720D24397471EA27&json=true";
    const xmlUrl = "https://api.coinmarketcap.com/v1/ticker/stellar/";

    fetch(wunderUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("weather", data.current_observation)
      let weather = data.current_observation.temperature_string;
      this.setState({weather: weather});
    })
    .catch((error) => {
      console.log("error", error)
    });

    fetch(trimetUrl)
    .then((resp) => resp.json())
    .then((data) => {
      let arrivals;
      console.log(data.resultSet)
      arrivals = data.resultSet.arrival;
      this.setState({arrivals: arrivals});
      console.log("arrivals", this.state.arrivals)
    })
    .catch((error) => {
      console.log("error", error)
    });

    fetch(xmlUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("xlm", data)
      let xlm = data[0].price_usd;
      this.setState({xlm: xlm});
    })
    .catch((error) => {
      console.log("error", error)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <h1>BUS</h1>
          <div>
            <h3>17</h3>
            {this.state.arrivals.map((arrival, index) => {
              if (arrival.route === 17)
              return  <p key={index}>
                        <Moment fromNow>{arrival.scheduled}</Moment>
                      </p>
            })}
            <h3>77</h3>
            {this.state.arrivals.map((arrival, index) => {
              if (arrival.route === 77)
              return  <p key={index}>
                        <Moment fromNow>{arrival.scheduled}</Moment>
                      </p>
            })}
          </div>
          <h1>WEATHER</h1>
          <p>{this.state.weather}</p>
          <h1>XLM PRICE</h1>
          <p>{this.state.xlm}</p>
        </div>
      </div>
    );
  }
}

export default App;
