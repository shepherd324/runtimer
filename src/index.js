import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Race from './Race'
import Runners from './Runners'
import reportWebVitals from './reportWebVitals';
import Test from './Test'
import store from 'store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

let initialState = store.get('initialState')
if (!initialState) {
  initialState = {
    races: [
      {
        id: 'race-dummy', name: "Dummy Race", start: 0, end: 0, laps: []
      }
    ],
    runners: [
      {
        id: 'runner-3', name: "Anya Schafer"
      }
    ]
  };
  store.set('initialState', initialState)
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <div><Link to="/">Races</Link></div>
      <div><Link to="/test">Test</Link></div> */}
      <Switch>
        <Route exact path="/">
            <App fullState={initialState} />
        </Route>
        <Route path="/runners">
          <Runners runners={initialState.runners} />
        </Route>
        {/* <Route path="/race/:id" children={<Race fullState={initialState} />} /> */}
        <Route path="/race/:id">
          <Race />
        </Route>
        <Route exact path="/test">
          <Test />
        </Route>
      </Switch>
    </Router>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
