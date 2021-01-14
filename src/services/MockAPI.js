class MockAPI {
    static get base() {
        return 'http://localhost:3000/mock';
    }

    static get find() {
        return `${MockAPI.base}/find`;
    }

    static get forecastFiveDays() {
        return `${MockAPI.base}/forecast`;
    }

    static get dailyForecast() {
        return `${MockAPI.base}/weather`;
    }
}

export default MockAPI;