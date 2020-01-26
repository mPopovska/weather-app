import React from 'react';
import './App.css';
import WeatherComponent from './components/WeatherComponent';
import RouteNotFoundComponent from './components/RouteNotFoundComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <WeatherComponent />
          </Route>
          <Route path="/daily-details/:day" component={WeatherComponent} />
          <Route component={RouteNotFoundComponent} />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
