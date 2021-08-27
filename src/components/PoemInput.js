import React from 'react'
import './poemInput.css'

function PoemInput({ handleInput }) {
  return (
    <div>
      <textarea
        className="poem-input"
        onChange={(e) => {
          handleInput(e)
        }}
      >

      </textarea>
    </div>
  )
}

export default PoemInput
