import axios from 'axios';
import API from './API';
import { DayForecastModel } from '../models/WeatherModels';

const APP_ID = 'dddc32cce443e484f1823cc93142a2d5';

class WeatherService {
    static getWeatherByPosition(requestParams, cancelToken) {
        const params = {
            cnt: 40,
            appid: APP_ID,
            units: 'metric',
            ...requestParams
        };

        return axios.get(API.dailyForecast, {
            params,
            cancelToken,
            transformResponse: (data) => {
                let dailyData = new DayForecastModel();
                dailyData.mapFromResponse(JSON.parse(data));
                return dailyData;
            }
        });
    }

    static getFiveDaysForecast(requestParams, cancelToken) {
        const params = {
            cnt: 40,
            appid: APP_ID,
            units: 'metric',
            ...requestParams
        };

        return axios.get(API.forecastFiveDays, {
            params,
            cancelToken,
            transformResponse: (data) => {
                data = JSON.parse(data);
                let today = new Date();
                let nextDays = [];
                for (var i = 0; i < 5; i++) {                    
                    let today_formated = today.getFullYear() + "-" + ("0" + today.getMonth() + 1).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
                    nextDays.push(today_formated);
                    today.setDate(today.getDate() + 1);
                }
                let daysList = [];
                let daysDetailsList = {};
                for (let i = 0; i < 5; i++) {
                    let currentDayObjs = data.list.filter(item => item.dt_txt.includes(nextDays[i]));
                    let daysDetails = [];
                    currentDayObjs.forEach(day =>{
                        let mappedDay = new DayForecastModel();
                        mappedDay.mapHourlyFromFiveDaysResponse(day);
                        daysDetails.push(mappedDay);
                    });                  
                    let dailyData = new DayForecastModel();
                    dailyData.mapFromFiveDaysResponse(currentDayObjs);
                    if(i !== 0)
                    daysList.push(dailyData);
                    daysDetailsList[dailyData.routeName] = daysDetails;
                }
                return { daysList, daysDetailsList };
            }
        });
    }

    static getCities(q, cancelToken) {
        const params = {
            q,
            cnt: 10,
            appid: APP_ID
        };

        return axios.get(API.find, {
            params,
            cancelToken
        });
    }

}

export default WeatherService;