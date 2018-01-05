import React, { Component } from 'react';
import Moment from 'react-moment';
import './arrival.css';

class Arrival extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props.arrival)
  }

  render() {
    return (
      <div className="arrivalCard">
        <span className="route">{this.props.arrival.route}</span>
        <Moment fromNow ago className="time">{this.props.arrival.scheduled}</Moment>
      </div>
    )
  }
}

export default Arrival
