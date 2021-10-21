import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Race from './Race'
import reportWebVitals from './reportWebVitals';
import Test from './Test'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { StateProvider } from './Store';

const Races = [
  {
    id: 'race-dummy', name: "Dummy Race", start: 0
  }
]

const Runners = [
  {
    id: 'runner-3', name: "Anya Schafer"
  },
  {
    id: 'runner-2', name: "Calla Schafer"
  },
  {
    id: 'runner-1', name: "Bryn Schafer"
  }
]

const Laps = [
  {
    id: 0,
    raceId: 0,
    runnerId: 0,
    lapNum: 1,
    seconds: 0
  }
]

ReactDOM.render(
  <StateProvider >
  <React.StrictMode>
    <Router>
      {/* <div><Link to="/">Races</Link></div>
      <div><Link to="/test">Test</Link></div> */}
      <Switch>
        <Route exact path="/">
          <App races={Races} runners={Runners} laps={Laps}  />
        </Route>
        <Route path="/race/:id" children={<Race races={Races} runners={Runners} laps={Laps} />} />
        <Route exact path="/test">
          <Test />
        </Route>
      </Switch>
    </Router>
    </React.StrictMode>
  </StateProvider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
