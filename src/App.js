import React, { useState, useEffect } from 'react'
import {  Container, Button, ListGroup, Alert } from 'react-bootstrap';
import AppNav from './AppNav'
import './App.css';
import RaceForm from './RaceForm';
import { nanoid } from "nanoid";
import {
  Link
} from "react-router-dom";
import { persistRaces, persistRunners, persistLaps, getRaces, getLaps } from './DataStore'

export function App(props) {
  
  const [races, setRaces] = useState([])


  useEffect(() => {
    const newRaces = getRaces()
    setRaces(newRaces)
  }, [])

  useEffect(() => {
    persistRaces(races)
  }, [races])

  function addRace(race) {
    const newRace = { id: 'race-' + nanoid(), name: race.name, date: race.start, laps: [], start: 0, end: 0 }
    setRaces([...races, newRace])
  }

  function deleteRace(id) {
    const newRaces = [...races].filter(race => id !== race.id)
    setRaces(newRaces)
  }

  const racesList = races.map(race => (
    <ListGroup.Item><Link key={race.id} className="link" to={`/race/${race.id}`}>{race.name}</Link> <Button size="sm" variant="danger" onClick={ () => deleteRace(race.id) }>Delete</Button></ListGroup.Item>
  ))

  return (
    <Container>
      <AppNav />
      <Container bg="dark">
        <div className="main">
          <Alert variant="success">Races</Alert>
          <ListGroup>
            {racesList}
            <ListGroup.Item>
              <RaceForm name="" addRace={addRace} />
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Container>
    </Container>
        
  );
}


export default App;

