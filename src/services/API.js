class API {
    static get base() {
        return 'https://api.openweathermap.org/data/2.5';
    }

    static get find() {
        return `${API.base}/find`;
    }

    static get forecastFiveDays() {
        return `${API.base}/forecast`;
    }

    static get dailyForecast() {
        return `${API.base}/weather`;
    }
}

export default API;