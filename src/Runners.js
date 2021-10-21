import React, { useState, useEffect } from 'react'
import { Badge, Container, ListGroup, Alert, Button } from 'react-bootstrap';
import Glyphicon from '@strongdm/glyphicon'
import AppNav from './AppNav'
import { nanoid } from 'nanoid';
import RunnerForm from './RunnerForm'
import { persistRunners, getRunners } from './DataStore'

function Runners(props) {

  const [runners, setRunners] = useState([])

  useEffect(() => {
    const newRunners = getRunners()
    setRunners(newRunners)
  }, [])

  useEffect(() => {
    persistRunners(runners)
  }, [runners])

  const runnerList = runners.map(runner => (
    <ListGroup.Item className="d-flex justify-content-between align-items-start" key={runner.id}>{runner.name} <Button size="sm" variant="danger" onClick={() => deleteRunner(runner.id)}><Glyphicon glyph='remove' /></Button></ListGroup.Item>
  ))

  function addRunner(runner) {
    const newRunner = { id: 'runner-' + nanoid(), name: runner.name }
    setRunners([...runners, newRunner]);
  }

  function deleteRunner(id) {
    const newRunners = [...runners].filter(x => x.id !== id)
    setRunners(newRunners)
  }

  return (
    <Container>
      <AppNav />
      <Container bg="dark">
        <div className="main">
          <Alert variant="success">Runners</Alert>
          <ListGroup>
            {runnerList}
            <ListGroup.Item>
              <RunnerForm name="" addRunner={addRunner} />
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Container>
    </Container>
  );
}

export default Runners;
