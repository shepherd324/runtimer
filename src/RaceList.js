import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Runner from './Runner';
import Race from './Race';
import RaceForm from './RaceForm';
import { nanoid } from "nanoid";


function RaceList(props) {

  const [races, setRaces] = useState(props.races)
  const [runners, setRunners] = useState(props.runners)
  const [laps, setLaps] = useState(props.laps)

  function addRace(race) {
    const newRace = { id: 'race-' + nanoid(), name: race.name, date: race.date }
    setRaces([...races, newRace]);
  }

  function deleteRace(id) {
    const newRaces = races.filter(race => id !== race.id)
    setRaces(newRaces)
  }

  function addRunner(runner) {
    runner.id = 'runner-' + nanoid()
    setRunners([...runners, runner])
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
    <Race
      id={race.id}
      key={race.id}
      name={race.name}
      date={race.date}
      runners={props.runners}      
    />
  ))


  return (
    <div className="App">
      <header className="App-header">
        Races
      </header>
      <div>
        {racesList}
      </div>
      <div class="race-form">
        <RaceForm name="" date="" addRace={addRace} />
      </div>
    </div>
  );
}

export default RaceList;
