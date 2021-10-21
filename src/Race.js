import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Navbar, Container, ListGroup, Table, Alert, Button } from 'react-bootstrap';
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
  const _isMounted = useRef(true)


  const startCounter = useCallback(() => {
    if (!_isMounted) return;
    if (race.end !== 0) return;
    if (intervalId && intervalId.current !== null) return;
    console.log('startCounter fired')

    if (race.start > 0) {
      counter.current = (new Date().getTime() - race.start) / 100
    } else {
      counter.current = 0
    }
    clearInterval(intervalId.current)
    intervalId.current = setInterval(() => {
      if (_isMounted) {
        //need a counter and a state variable because setState doesn't immediately update so it's unreliable
        counter.current++
        setTimeElapsed(counter.current)
      }

    }, 100)
  })

  useEffect(() => {
    return () => {
      _isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setRunners(getRunners().sort(x => x.name))
    setRace(getRace(id))
  }, [id])

  useEffect(() => {
    persistRace(race)
    startCounter()
  }, [race, startCounter])


  let counter = useRef(0)
  let intervalId = useRef(null)

  function startRace() {
    const newRace = { ...race }
    newRace.start = new Date().getTime()
    setRace(newRace)
    startCounter()    
  }

  

  function stopRace() {
    const stopTime = new Date().getTime()
    if (window.confirm('Are you sure you want to stop the race - this action cannot be undone?')) {
      clearInterval(intervalId.current)
      const newRace = { ...race }
      newRace.end = stopTime
      setRace(newRace)
    }    
  }


  function recordLap(newLap) {
    newLap.time = timeElapsed
    const newRace = { ...race }
    newRace.laps.push(newLap)
    setRace(newRace)
  }

  function cancelLap(lapId) {
    let newRace = {...race}
    newRace.laps = race.laps.filter(x => x.id !== lapId)
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
        <Button onClick={stopRace}>Stop Race</Button> <span>Elapsed Time: {(timeElapsed / 10).toFixed(2)}</span>
      </div>
  }
  

  const runnerList = runners.map(runner => (
      <RaceRunner
        race={race}
        runner={runner}
        laps={race.laps.filter(x => x.runnerId === runner.id)}
        key={runner.id}
        elapsedTime={timeElapsed}
        recordLap={recordLap}
        cancelLap={cancelLap}
      />
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
          <Table striped bordered hover>
            <tbody>
              {runnerList}
            </tbody>
          </Table>
        </div>
      </Container>
    </Container>
  )
}

export default Race;
