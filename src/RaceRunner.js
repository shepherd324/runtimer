import React, { useEffect, useState } from 'react'
import { Navbar, Container, ListGroup, ListGroupItem, Alert, Button } from 'react-bootstrap';
import Glyphicon from '@strongdm/glyphicon'
import { nanoid } from "nanoid";
import { getRaceLaps } from './DataStore'

function RaceRunner(props) {
  
  const [race, setRace] = useState(props.race)
  const [runner, setRunner] = useState(props.runner)
  
  /*
  If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
  */

  useEffect(() => {
    setRace(props.race)
  })
  
  function recordLap() {    
    const newLap = { id: 'lap-' + nanoid(), raceId: race.id, runnerId: runner.id, lapNum: race.laps.length + 1 }
    props.recordLap(newLap)
  }

  function cancelLastLap() {
    props.cancelLap()
  }
  
  const runnerLaps = race.laps.filter(x => x.runnerId === runner.id).map(lap => (
    <ListGroup.Item key={lap.id}><span>Lap {lap.lapNum}: {lap.time / 10} </span></ListGroup.Item>
  ))

  let cancelCTA = ""
  if (race.laps.length > 0 && race.end == 0) {
    cancelCTA = <ListGroup.Item><Button variant="danger" size="sm" onClick={cancelLastLap}>Cancel Last</Button></ListGroup.Item>
  }
  
  let lapButton = ""
  if (race.start > 0 && race.end === 0) {
    lapButton = <ListGroup.Item><Button onClick={recordLap} size="sm"><Glyphicon glyph='plus' /> Lap</Button></ListGroup.Item>
  }

  return (
    <ListGroup horizontal>
      <ListGroup.Item>{runner.name}</ListGroup.Item>
      {runnerLaps}
      {lapButton}
      {cancelCTA}
    </ListGroup>
  );
}

export default RaceRunner;
