import { EventEmitter } from 'events';
import dispather from './dispatcher';
import * as Constants from './actionConstants';
import WeatherService from '../services/WeatherService';

class WeatherStore extends EventEmitter {

    getCurrentLocationWeather() {
        navigator.geolocation.getCurrentPosition(function (x) {
            WeatherService.getWeatherByPosition({ lon: x.coords.longitude, lat: x.coords.latitude }).then(data => {
                this.emit(Constants.SUCCESS_FORECAST, data.data);
            });
            WeatherService.getFiveDaysForecast({ lon: x.coords.longitude, lat: x.coords.latitude }).then(data => {
                this.emit(Constants.SUCCESS_HOURLY_FORECAST, data.data);
            });
        }.bind(this), function (error) {
            WeatherService.getWeatherByPosition({ id: 2618425 }).then(data => {
                this.emit(Constants.SUCCESS_FORECAST, data.data);
            });
            WeatherService.getFiveDaysForecast({ id: 2618425 }).then(data => {
                this.emit(Constants.SUCCESS_HOURLY_FORECAST, data.data);
            });
        }.bind(this));


    }

    getCityWeather(city) {
        let self = this;
        WeatherService.getWeatherByPosition(city).then(data => {
            self.emit(Constants.SUCCESS_FORECAST, data.data);
        });
        WeatherService.getFiveDaysForecast(city).then(data => {
            this.emit(Constants.SUCCESS_HOURLY_FORECAST, data.data);
        });

    }

    getCities(city) {
        let self = this;
        WeatherService.getCities(city).then(data => {
            if (data.data.list.length > 0)
                self.emit(Constants.SUCCESS_CITIES, data.data.list);
        });
    }

    handleActions(action) {
        switch (action.type) {
            case Constants.CURRENT_LOCATION_WEATHER: {
                this.getCurrentLocationWeather();
                break;
            }
            case Constants.CITY_FORECAST: {
                this.getCityWeather(action.city);
                break;
            }
            case Constants.GET_CITIES: {
                this.getCities(action.city);
                break;
            }
            default: {
                break;
            }
        }
    }

}

const weatherStore = new WeatherStore();
dispather.register(weatherStore.handleActions.bind(weatherStore));
export default weatherStore;