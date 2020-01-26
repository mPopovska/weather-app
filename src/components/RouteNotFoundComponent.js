import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RouteNotFoundComponent extends Component {
    render() {
        return(
            <div>
                <div className="route-not-found">404</div>
                <div className="route-not-found-desc">Page not found!</div>
                <Link className="route-not-found-link" to="/">Go home</Link>
            </div>
        )
    }
}

export default RouteNotFoundComponent;