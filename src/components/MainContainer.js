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
  const LINE_BREAK = 'LINE_BREAK';

  const tygerTyger =  `Tiger, tiger, burning bright
  In the forests of the night,
  What immortal hand or eye
  Could frame thy fearful symmetry?`;

  const handleInput = (e) => {
    setPoemInput(e.target.value);
  }

  
  const initializeStanza = (poem) => {

    setRawPoem(poem);
    const stanzaArray = poem.split(' ');
    const wordsOfStanza = stanzaArray
      // remove extra spaces included by project gutenber, for example
      .filter(word => word !== '')
      .reduce((newStanza, word) => {
        // if the line break chaarcter iis on the end of the string
        if (word.match(/[\n]$/g)) {
          const trimmedWord = word.replace(/\r?\n|\r/g, '');
          const newWord = {
            id: uniqid(),
            text: trimmedWord,
            spin: false,
          }
          newStanza.push(newWord, LINE_BREAK)
        } 

        // if the /n character is stuck between two words/not on the end
        else if (word.match(/\r?\n|\r/g)) {
          const words = word.split('\n');
          console.log(words);
          const word1 = {
            id: uniqid(),
            text: words[0],
            spin: false
          }
          const word2 = {
            id: uniqid(),
            text: words[1],
            spin: false
          }
          newStanza.push(word1, LINE_BREAK, word2);
        }
        
        else {
          newStanza.push({
            id: uniqid(),
            text: word,
            spin: false
          })
        }
      return newStanza;
    }, []);
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
      if (word === LINE_BREAK) return LINE_BREAK;
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
