import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid';
import Line from './Line';
import './mainContainer.css'
import PoemInput from './PoemInput';

function MainContainer() {


  const [rawPoem, setRawPoem] = useState('');
  const [stanza, setStanza] = useState([]);
  const [isStuttering, setIsStuttering] = useState(false);
  const [intervalID, setIntervalID] = useState(null);
  const [poemInput, setPoemInput] = useState('');

  const tygerTyger =  `Tiger, tiger, burning bright
  In the forests of the night,
  What immortal hand or eye
  Could frame thy fearful symmetry?`;

  const handleInput = (e) => {
    setPoemInput(e.target.value);
  }

  
  const initializeStanza = (poem) => {

    setRawPoem(poem);
    console.log(poem);
    const stanzaArray = poem.split(' ');
    console.log(stanzaArray)
    const wordsOfStanza = stanzaArray.map(word => {
      return {
        id: uniqid(),
        text: word,
        spin: false,
      }
    });

    // if there's an active stutter in the background already
    if (intervalID) {
      window.clearInterval(intervalID);
      setIntervalID(null);
      setIsStuttering(false);
    }
    setStanza(wordsOfStanza);
  }

  const flipSpin = (stanza) => {
    return stanza.map((word) => {
      return { ...word, spin: !word.spin }
    })
  }

  const toggleSingleWordSpin = (wordId) => {
    const newStanza = stanza.map(word => {
      if (word.id === wordId) {
        return {...word, spin: !word.spin}
      }
      return word;
    })
    setStanza(newStanza)
  }

  const handleToggleSpinAll = () => {
    const newStanza = flipSpin(stanza);
    setStanza(newStanza);
  }

  const randomize = () => {
    const randomOrderStanza = stanza
      .map(a => ({sort: Math.random(), value: a}))
      .sort((a,b) => a.sort - b.sort)
      .map(a => a.value);
    setStanza(randomOrderStanza);
  }

  // need to fix this to deal with escaped line break character
  // needs to be fixed in the first processing of the poem into
  // an array of objects as well
  const chopIntoLines = (stanza) => {
    const lines = [];
    let currentLine = [];
    for (let i = 0; i < stanza.length; i ++) {
      if (stanza[i].text === '') {
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
    .map(line => {
      return (
        <Line 
          line={line}
          toggleSingleWordSpin={toggleSingleWordSpin}
        />
      )
    })

  const toggleStutter = () => {
    setIsStuttering(isStuttering => !isStuttering)
  }

  const newPoem = () => {
    if (poemInput !== '') {
      initializeStanza(poemInput);
      return;
    }
  }

  const resetPoem = () => {
    initializeStanza(rawPoem);
  }

  useEffect(() => {
    initializeStanza(tygerTyger)
  }, []);

  useEffect(() => {
    if (isStuttering) {
    const id =  window.setInterval(() => {
        setStanza(stanza => flipSpin(stanza))
      }, 500)
      setIntervalID(id)
      return () => window.clearInterval(id);
    } 
  }, [isStuttering]);

  return (
    <div>
      <div className='main-container'>
        {lines}
      </div>
      <div className='buttons'>
        <button className="button" onClick={() => randomize()}>New Order</button>
        <button className="button" onClick={() => handleToggleSpinAll()}>Toggle Spin</button>
        <button className="button" onClick={() => resetPoem()}>Reset</button>
        <button 
          className={`button ${isStuttering ? 'active' : ''}` }
          onClick={() => toggleStutter()}
          >Stutter
        </button>
        <button className="button" onClick={() => newPoem()}>Set Poem</button>
      
      </div>
      <PoemInput 
        handleInput={handleInput}
      />

    </div>
  )
}

export default MainContainer
