import React, { useEffect, useRef, useState } from "react";
import { Form, FloatingLabel, Button, InputGroup } from 'react-bootstrap';
import Glyphicon from '@strongdm/glyphicon'


function RunnerForm(props) {

  let runnerName = useRef(null)
  handleSubmit.bind(this);

  function handleSubmit(e) {
    e.preventDefault()
    props.addRunner({
      name: runnerName.current.value
    })
    runnerName.current.value = ''
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup className="mb-3" size="sm">
          <Form.Control type="text" placeholder="Runner Name" className="text-muted" size="sm" ref={runnerName} />
          <Button type="submit" variant="success"><Glyphicon glyph='plus' /> Add Runner</Button>
        </InputGroup>
          
        </Form.Group>
    </Form>
    
  );
}


export default RunnerForm;
