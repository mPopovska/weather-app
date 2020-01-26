import dispather from './dispatcher';
import * as Constants from './actionConstants';

export function getCurrentLocationWeather() {
    dispather.dispatch({
        type: Constants.CURRENT_LOCATION_WEATHER
    })
}

export function getCityWeather(city) {
    dispather.dispatch({
        type: Constants.CITY_FORECAST,
        city
    })
}

// export function getHourlyForecast(city) {
//     dispather.dispatch({
//         type: Constants.HOURLY_FORECAST,
//         city
//     })
// }

export function getCities(city) {
    dispather.dispatch({
        type: Constants.GET_CITIES,
        city
    })
}