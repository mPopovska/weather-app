import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WeatherCardComponent extends Component {

    constructor(props) {
        super();
        this.state = {
            cityWeather: props.model,
        }

    }

    render() {
        if (this.props.model) {
            return (
                <div className="rw-box">
                    <div className={`rw-main type-5days`}>
                        <div className="rw-box-left">
                            <h2>{this.props.model.cityName}</h2>
                            <div className="rw-today">
                                <div className="date">{this.props.model.dayName}</div>
                                <div className="hr"></div>
                                <div className="range">{this.props.model.maxTemp} / {this.props.model.minTemp} °C </div>
                                <div className="desc">
                                    <i className={`wicon wi ${this.props.model.icon}`}></i>
                                    &nbsp;{this.props.model.description}
                                </div>
                            </div>
                            <Link to={"/daily-details/" + this.props.model.routeName}>
                                details
                            </Link>
                        </div>
                        <div className="rw-box-right">
                            <i className={`wicon wi ${this.props.model.icon}`}></i>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }

    }
}

export default WeatherCardComponent;