import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Navbar, Container, ListGroup, ListGroupItem, Alert, Button } from 'react-bootstrap';
import './Race.css';
import RaceRunner from './RaceRunner';
import AppNav from './AppNav';
import {
  Link,
  useParams
} from "react-router-dom";
import { persistRace, persistLaps, getLaps, getRunners, getRace } from './DataStore'

function Race(props) {

  let { id } = useParams();

  const [runners, setRunners] = useState([])
  const [race, setRace] = useState({})
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    setRunners(getRunners().sort(x => x.name))
    setRace(getRace(id))
  }, [id])

  useEffect(() => {
    persistRace(race)
  }, [race])

  let counter = 0
  let intervalId = useRef(null)

  function addTime() {
    setTimeElapsed(timeElapsed + 1)
  }

  function startRace() {
    const newRace = { ...race }
    newRace.start = new Date().getTime()
    setRace(newRace)
    intervalId.current = setInterval(() => {
      //need a counter and a state variable because setState doesn't immediately update so it's unreliable
      counter++
      setTimeElapsed(counter)
    }, 100)
  }

  function stopRace() {
    if (window.confirm('Are you sure you want to stop the race - this action cannot be undone?')) {
      clearInterval(intervalId.current)
      const newRace = { ...race }
      newRace.end = newRace.start + (timeElapsed * 10)
      setRace(newRace)
    }
    
  }

  function recordLap(newLap) {
    newLap.time = timeElapsed
    const newRace = { ...race }
    newRace.laps.push(newLap)
    setRace(newRace)
  }

  function cancelLap() {
    let newRace = {...race}
    newRace.laps = race.laps.slice(0, race.laps.length - 1)
    setRace(newRace)
  }

  let raceHeader = ""
  if (race && race.start === 0) {
    raceHeader =
      <Container>
        <Button onClick={startRace}>Start Race!</Button>
      </Container>
  } else if (race && race.start > 0 && race.end === 0) {
    raceHeader =
      <div>
        <Button onClick={stopRace}>Stop Race</Button> <span>Elapsed Time: {timeElapsed / 10}</span>
      </div>
  }
  

  const runnerList = runners.map(runner => (
    <ListGroup.Item>
      <RaceRunner
        race={race}
        runner={runner}
        laps={race.laps}
        key={runner.id}
        elapsedTime={timeElapsed}
        recordLap={recordLap}
        cancelLap={cancelLap}
      />
    </ListGroup.Item>
  ))


  return (
    <Container>
      <AppNav />
      <Container bg="dark">
        <div className="main">
          <Alert variant="success">
            {race.name}
          </Alert>
          <div className="raceHeader">
            {raceHeader}
          </div>
          <ListGroup>
            {runnerList}
          </ListGroup>
        </div>
      </Container>
    </Container>
  )
}

export default Race;
