import React, { useEffect, useState, useRef } from 'react'
import { Navbar, Container, ListGroup, ListGroupItem, Alert, Button } from 'react-bootstrap';
import Glyphicon from '@strongdm/glyphicon'
import { nanoid } from "nanoid";
import { getRaceLaps } from './DataStore'

function RaceRunner(props) {
  
  const [race, setRace] = useState(props.race)
  const [runner, setRunner] = useState(props.runner)
  
  const totalTime = useRef(0)
  /*
  If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
  */

  useEffect(() => {
    setRace(props.race)
  }, [props.race])
  
  function recordLap() {    
    const newLap = { id: 'lap-' + nanoid(), raceId: race.id, runnerId: runner.id, lapNum: race.laps.filter(x => x.runnerId === runner.id).length + 1 }
    props.recordLap(newLap)
  }

  function cancelLastLap() {
    const lapId = race.laps.filter(x => x.runnerId === runner.id).at(-1).id
    props.cancelLap(lapId)
  }
  
  const runnerLaps = race.laps.filter(x => x.runnerId === runner.id).map(lap => (
    <td key={lap.id}><span>Lap {lap.lapNum}: {(lap.time / 10).toFixed(2)} </span></td>
  ))

  let cancelCTA = ""
  if (race.laps.filter(x => x.runnerId === runner.id).length > 0 && race.end === 0) {
    cancelCTA = <td><Button variant="danger" size="sm" onClick={cancelLastLap}>Cancel Last</Button></td>
  }
  
  let lapButton = ""
  if (race.start > 0 && race.end === 0) {
    lapButton = <td><Button onClick={recordLap} size="sm"><Glyphicon glyph='plus' /> Lap</Button></td>
  }

  race.laps.filter(x => x.runnerId === runner.id).forEach(x => {
    totalTime.current = totalTime.current + x.time
  })

  let totalCol = totalTime.current !== 0 ? <td>Total: {totalTime.current.toFixed(2)}</td> : ""
  return (
    <tr>
      <td>{runner.name}</td>
      {runnerLaps}
      {lapButton}
      {cancelCTA}
      <td>Total: {(race.laps.filter(x => x.runnerId === runner.id).reduce((prev,cur) => { return cur.time + prev }, 0) / 10).toFixed(2)}</td>
    </tr>
      
  );
}

export default RaceRunner;
