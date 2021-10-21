import React, { useState, useContext } from 'react'
import logo from './logo.svg';
import './App.css';
import Runner from './Runner';
import Race from './Race';
import RaceForm from './RaceForm';
import Test from './Test'
import RaceList from './RaceList'
import { nanoid } from "nanoid";
import { store } from './Store';
import {
  Link
} from "react-router-dom";

function App(props) {

  const globalState = useContext(store);
  console.log(globalState); // this will return { color: red }

  const [races, setRaces] = useState(props.races)
  const [runners, setRunners] = useState(props.runners)
  const [laps, setLaps] = useState(props.laps)

  function addRace(race) {
    const newRace = { id: 'race-' + nanoid(), name: race.name, date: race.start }
    setRaces([...races, newRace]);
  }

  function deleteRace(id) {
    const newRaces = races.filter(race => id !== race.id)
    setRaces(newRaces)
  }

  function addRunner(runner) {
    const newRunner = { id: 'runner-' + nanoid(), name: runner.name }
    setRaces([...runners, newRunner]);
  }

  function deleteRunner(id) {
    const newRunners = runners.filter(runner => id !== runner.id)
    setRunners(newRunners)
  }

  function addLap(runnerId, raceId, seconds) {
    const lapsSoFar = laps.filter(x => x.runnerId == runnerId && x.raceId == raceId)
    const newLap = { id: 'lap-' + nanoid(), raceId: raceId, runnerId: runnerId, seconds: seconds, lapNum: lapsSoFar.length + 1 }
    setLaps([...laps, newLap])
  }

  function deleteLap(id) {
    const newLaps = laps.filter(lap => id !== lap.id)
    setLaps(newLaps)
  }

  const racesList = races.map(race => (
    <Link to={`/race/${race.id}`}>{race.name}</Link>
  ))


  return (
    <div className="App">
      <header className="App-header">
        Race Timer
      </header>
      
      <div>
        {racesList}
      </div>
      <div class="race-form">
        <RaceForm name="" addRace={addRace} />
      </div>
    </div>
  );
}

export default App;
