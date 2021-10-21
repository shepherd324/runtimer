import React, { useEffect, useRef, useState } from "react";


function RaceForm(props) {

  let raceName = useRef(null)
  handleSubmit.bind(this);

  function handleSubmit(e) {
    e.preventDefault()
    props.addRace({
      name: raceName.current.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Race Name" ref={raceName} />
      <button type="submit">Add Race</button>
    </form>
  );
}

export default RaceForm;
