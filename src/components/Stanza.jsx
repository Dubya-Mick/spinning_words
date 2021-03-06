import React from 'react'
import Line from './Line'
import './stanza.css'

function Stanza({ poem, toggleSingleWordSpin }) {

  const LINE_BREAK = 'LINE_BREAK';
  console.log(poem)

  const chopIntoLines = (poem) => {
    const lines = [];
    let currentLine = [];
    for (let i = 0; i < poem.stanza.length; i ++) {
      if (poem.stanza[i] === LINE_BREAK) {
        lines.push(currentLine);
        currentLine = [];
      } else {
        currentLine.push(poem.stanza[i]);
      }
    }
    // last line gets pushed in once loop finishes
    lines.push(currentLine);
    return lines;
  }

  const lines = chopIntoLines(poem)
    .map((line, index) => {
      return (
        <Line 
          key={index}
          line={line}
          toggleSingleWordSpin={toggleSingleWordSpin}
        />
      )
    })


  return (
    <div className="stanza">
      {lines}
    </div>
  )
}

export default Stanza
