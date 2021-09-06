import React from 'react'
import './word.css'

function Word({ word, toggleSingleWordSpin }) {

  return (
    <div 
      key={word.id}
      className={`box ${word.spin ? "" : "paused"}`}
      onClick={() => toggleSingleWordSpin(word.id)}
    >
      {word.text}
    </div>
  )
}

export default Word
