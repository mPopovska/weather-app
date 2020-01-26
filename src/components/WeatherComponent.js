import React, { Component } from 'react';
import * as WeatherActions from '../store/actions';
import WeatherStore from '../store/WeatherStore';
import * as Constants from '../store/actionConstants';
import { DayForecastModel } from '../models/WeatherModels';
import WeatherCardComponent from './WeatherCardComponent';
import WeatherCardSmallComponent from './WeatherCardSmallComponent';
import HourlyForecastComponent from './HourlyForecastComponent';
import SearchComponent from './SearchComponent';

class WeatherComponent extends Component {

    constructor() {
        super();
        WeatherActions.getCurrentLocationWeather();
        this.state = {
            cityWeather: new DayForecastModel(),
            nextDays: [],
            hourlyDetails: new DayForecastModel(),
            hourlyDetailsToDisplay: null,
            hourlyVisibility: false
        }

    }

    componentDidMount() {
        WeatherStore.on(Constants.SUCCESS_FORECAST, (data) => {
            this.setState({
                cityWeather: data,
            });
        });

        WeatherStore.on(Constants.SUCCESS_CITY_FORECAST, (data) => {
            this.setState({
                cityWeather: data,
            });
        });

        WeatherStore.on(Constants.SUCCESS_HOURLY_FORECAST, (data) => {
            this.setState({
                nextDays: data.daysList,
                hourlyDetails: data.daysDetailsList,
            });
        });

    }

    componentDidUpdate(prevProps) {
        if (this.props.match && this.props.match.params) {
            if (!this.state.hourlyVisibility || prevProps.match.params.day !== this.props.match.params.day) {
                let dataToDisplay = this.state.hourlyDetails[this.props.match.params.day];
                if (dataToDisplay)
                    this.setState({
                        hourlyVisibility: true,
                        hourlyDetailsToDisplay: dataToDisplay
                    });
            }

        }
    }

    render() {
        if (this.state.cityWeather) {
            return (
                <div>
                    <SearchComponent />
                    <div className="weather-wrapper">
                    <WeatherCardComponent model={this.state.cityWeather} />
                    <div className="rw-box-days">
                        {
                            this.state.nextDays.map((day, i) => {
                                if (i >= 0) {
                                    return (
                                        <WeatherCardSmallComponent key={day.dayName} day={day} />
                                    );
                                }
                                return '';
                            })
                        }
                    </div>
                    <div className="rw-box-hours">
                        {
                            this.state.hourlyVisibility ? <HourlyForecastComponent day={this.props.match.params.day} model={this.state.hourlyDetailsToDisplay} /> : <div></div>
                        }
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

export default WeatherComponent;