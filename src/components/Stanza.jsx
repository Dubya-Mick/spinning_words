import React from 'react'
import Line from './Line'
import './stanza.css'

function Stanza({ stanza, toggleSingleWordSpin }) {

  const LINE_BREAK = 'LINE_BREAK';

  const chopIntoLines = (stanza) => {
    const lines = [];
    let currentLine = [];
    for (let i = 0; i < stanza.length; i ++) {
      if (stanza[i] === LINE_BREAK) {
        lines.push(currentLine);
        currentLine = [];
      } else {
        currentLine.push(stanza[i]);
      }
    }
    // last line gets pushed in once loop finishes
    lines.push(currentLine);
    return lines;
  }

  const lines = chopIntoLines(stanza)
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
