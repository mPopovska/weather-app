import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WeatherCardSmallComponent extends Component {

    render() {
        return (
            <div className='rw-day'>
                <div className="rw-date">{this.props.day.dayName}</div>
                <div className="desc">
                    <i className={`wicon wi ${this.props.day.icon}`}></i>
                    &nbsp;{this.props.day.description}
                </div>
                <div className="rw-desc">{this.props.day.description}</div>
                <div className="rw-range">{this.props.day.maxTemp} / {this.props.day.minTemp} °C</div>
                <Link to={"/daily-details/" + this.props.day.routeName}>
                    details
                </Link>
            </div>
        )
    }
}

export default WeatherCardSmallComponent;