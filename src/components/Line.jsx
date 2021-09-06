import React from 'react'
import Word from './Word'
import './line.css'

function Line({ line, toggleSingleWordSpin }) {

  const words = line.map((word, index) => {
    return (
      <Word 
        key={index}
        word={word}
        toggleSingleWordSpin={toggleSingleWordSpin}
      />
    )
  })

  return (
    <div className='line'>
      {words}
    </div>
  )
}

export default Line
