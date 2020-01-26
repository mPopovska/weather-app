import React, { Component } from 'react';

class HourlyForecastComponent extends Component {
    render() {
        return (
            <div className="hourly-forecast-wrapper">
                {
                    this.props.model.map((hour, i) => {
                        if (i >= 0) {
                            return (
                                <div key={hour.dayName} className='rw-day'>

                                    <div className="details-wrapper">
                                        <div className="rw-date details-item">{hour.dayName}</div>
                                        <div className="details-item">
                                            <i className={`wicon wi ${hour.icon}`}></i>
                                        </div>
                                        <div className="details-item rw-desc">{hour.description}</div>
                                        <div className="details-item rw-range">{hour.maxTemp} / {hour.minTemp} °C</div>
                                    </div>

                                </div>
                            )
                        }
                        return '';

                    })
                }
            </div>
        )
    }
}

export default HourlyForecastComponent;