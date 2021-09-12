import React, { useState, useEffect, useRef } from 'react'
import Poem from './Poem';
import Stanza from './Stanza';


function MainContainer2({ activePoem }) {
  console.log(activePoem);

  const intervalId = useRef(null);
  const [poemInput, setPoemInput] = useState('');

  // useEffect(() => {
  //   if (isStuttering) {
  //   const id =  window.setInterval(() => {
  //       setStanza(stanza => flipSpin(stanza))
  //     }, 500)
  //     return () => window.clearInterval(id);
  //   } 
  // }, [isStuttering]);

  return (
    <div>
      <Poem 
        activePoem={activePoem}

      />
    </div>
  )
}

export default MainContainer2
