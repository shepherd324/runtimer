import React, { useEffect, useRef, useState } from "react";
import { Form, FloatingLabel, Button, InputGroup } from 'react-bootstrap';
import Glyphicon from '@strongdm/glyphicon'


function RaceForm(props) {

  let raceName = useRef(null)
  handleSubmit.bind(this);

  function handleSubmit(e) {
    e.preventDefault()
    props.addRace({
      name: raceName.current.value
    })
    raceName.current.value = ''
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup className="mb-3" size="sm">
          <Form.Control type="text" placeholder="Race Name" className="text-muted" size="sm" ref={raceName} />
          <Button type="submit" variant="success"><Glyphicon glyph='plus' /> Add Race</Button>
        </InputGroup>
          
        </Form.Group>
    </Form>
    
  );
}

export default RaceForm;
