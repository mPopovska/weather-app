import * as moment from 'moment';
import getIcon from '../utils'

export class DayForecastModel {
    constructor() {
        this.dayName = '';
        this.currentTemp = '';
        this.feelsLike = '';
        this.minTemp = '';
        this.maxTemp = '';
        this.icon = '';
        this.humidity = '';
        this.description = '';
        this.mainDescriotion = '';
        this.cityName = '';
        this.routeName = '';
    }

    mapFromResponse(x) {
        this.currentTemp = x.main.temp;
        this.dayName = moment.unix(x.dt).format('dddd, MMM Do');
        this.maxTemp = x.main.temp_max;
        this.minTemp = x.main.temp_min;
        this.feelsLike = x.main.feels_like;
        this.humidity = x.main.humidity;
        this.icon = getIcon(x.weather[0].icon);
        this.mainDescriotion = x.weather[0].main;
        this.description = x.weather[0].description;
        this.cityName = x.name;
        this.routeName = moment.unix(x.dt).format('dddd');
    }

    mapFromFiveDaysResponse(x) {

        let minTemp = x.map((data) => {
            return data.main.temp_min;
        });
        let maxTemp = x.map((data) => {
            return data.main.temp_max;
        });
        let feelsLike = x.map((data) => {
            return data.main.feels_like;
        });
        let humidity = x.map((data) => {
            return data.main.humidity;
        });
        this.minTemp = Math.min(...minTemp);
        this.maxTemp = Math.max(...maxTemp);
        this.feelsLike = feelsLike.reduce((a, b) => a + b, 0) / feelsLike.length;
        this.humidity = humidity.reduce((a, b) => a + b, 0) / humidity.length;
        this.dayName = moment.unix(x[0].dt).format('dddd, MMM Do');
        let icons = [];
        let maxOccurances = -1;
        let maxOccurancesIcon = x[0].weather[0].icon;
        this.routeName = moment.unix(x[0].dt).format('dddd');
        x.forEach(day => {
            let i = icons.find(x => x.icon === day.weather[0].icon)
            if (i) {
                i["count"]++;
                if (i["count"] > maxOccurances) {
                    maxOccurances = i;
                    maxOccurancesIcon = i.icon;
                }
            } else {
                icons.push({ icon: day.weather[0].icon, count: 1 });
            }
        });
        this.icon = getIcon(maxOccurancesIcon);

    }

    mapHourlyFromFiveDaysResponse(x) {
        this.dayName = moment.unix(x.dt).format('HH:mm');
        this.minTemp = x.main.temp_min;
        this.maxTemp = x.main.temp_max;
        this.feelsLike = x.main.feels_like
        this.humidity = x.main.humidity;
        this.icon = getIcon(x.weather[0].icon);
        this.description = x.weather[0].description;
    }

}
