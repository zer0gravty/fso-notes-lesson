import React from 'react';

const Note = ({ note, important, toggleImportance }) => {
  const label = important ? 'make not important' : 'make important'
  return (
      <li className="note">{note}  <button onClick={toggleImportance}>{label}</button></li>
    )
  }

export default Note;