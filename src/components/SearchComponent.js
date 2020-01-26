import React, { Component } from 'react';
import Select from 'react-select';
import * as WeatherActions from '../store/actions';
import WeatherStore from '../store/WeatherStore';
import * as Constants from '../store/actionConstants';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {},
            cities: []
        }

        this.onSearch = this.onSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);

        WeatherStore.on(Constants.SUCCESS_CITIES, (data) => {
            this.setState({
                cities: data,
            });
        });
    }

    onSearch(city) {
        if (city.trim().length > 2)
            WeatherActions.getCities(city);
    }

    handleChange({ id, value }) {
        this.setState({ value });
        WeatherActions.getCityWeather({ id });
    }

    render() {
        const { value } = this.state;

        return (
            <div className="rw-box">


                <div className="search-input-wrapper">
                    <h1>Search for a city</h1>
                    <Select
                        value={value}
                        options={this.state.cities}
                        getOptionLabel={city => city.id ? `${city.name}, ${city.country || city.sys.country}` : 'Not selected'}
                        getOptionValue={(option) => (option['id'])}
                        onInputChange={this.onSearch}
                        onChange={this.handleChange}

                    />
                </div>
            </div>

        );
    }
}

export default SearchComponent;