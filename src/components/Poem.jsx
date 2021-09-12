import React from 'react'
import Line from './Line';

function Poem({ activePoem }) {

  const LINE_BREAK = 'LINE_BREAK';

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

  const lines = chopIntoLines(activePoem)
  .map((line, index) => {
    return (
      <Line 
        key={index}
        line={line}
      />
    )
  })

  return (
    <div>
      {lines}
    </div>
  )
}

export default Poem
