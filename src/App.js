import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import uniqid from 'uniqid';
import Header from './components/Header';
import SideNav from './components/SideNav';
import MainContainer2 from './components/MainContainer2';



function App() {

  const [sideNavDisplay, setSideNavDisplay] = useState(false);
  const [allPoems, setAllPoems] = useState({ poems: [], activePoem: { stanza: [] } });
  const LINE_BREAK = 'LINE_BREAK';




  const handleSetPoems = (userObj) => {
    setAllPoems({
      poems: userObj.poems,
      activePoem: userObj.poems[0]
    })
  }

  const toggleSideNavDisplay = () => {
    setSideNavDisplay(!sideNavDisplay);
  }

  const handleSetActivePoem = (activePoemId) => {
    const newActivePoem = allPoems.poems.find(poem => poem.id === activePoemId);
    setAllPoems({
      ...allPoems,
      activePoem: newActivePoem
    })
  }


  const initializePoem = (poem) => {

    const wordArray = poem.split(' ');
    const freshPoem = wordArray
      // remove extra spaces included by project gutenber, for example
      .filter(word => word !== '')
      .reduce((newPoem, word) => {
        // if the line break chaarcter iis on the end of the string
        if (word.match(/[\n]$/g)) {
          console.log(word);
          const trimmedWord = word.replace(/\r?\n|\r/g, '');
          console.log(trimmedWord)
          const newWord = {
            id: uniqid(),
            text: trimmedWord,
            spin: false,
          }
          newPoem.push(newWord, LINE_BREAK)
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
          newPoem.push(word1, LINE_BREAK, word2);
        }
        
        else {
          newPoem.push({
            id: uniqid(),
            text: word,
            spin: false
          })
        }
      return newPoem;
    }, []);
  
    return freshPoem;
    
    // if there's an active stutter in the background already
  
  }

  const resetPoem = () => {
    const newPoems = allPoems.poems.map(poem => {
      if (poem.id === allPoems.activePoem.id) {
        const resetPoem = initializePoem(poem.rawPoem);
        return {
          ...poem,
          stanza: resetPoem
        }
      }
      return poem;
    })
    setAllPoems({
      ...allPoems,
      poems: newPoems,
    });
  }


  const titles = allPoems.poems.map(poem => {
    return {
      title: poem.title,
      id: poem.id
    }
  });



  useEffect(() => {
    const dummyUserObj = {
      username: 'Jimmy',
      poems: [
        {
          rawPoem: `Tiger, tiger, burning bright
          In the forests of the night,
          What immortal hand or eye
          Could frame thy fearful symmetry?`,
          title: 'The Tyger',
          id: uniqid(),
          isStuttering: false,
          stanza:  [
            {id: uniqid(), text: "Tiger,", spin: false},
            {id: uniqid(), text: "tiger,", spin: false},
            {id: uniqid(), text: "burning", spin: true},
            {id: uniqid(), text: "bright", spin: false},
            LINE_BREAK,
            {id: uniqid(), text: "In", spin: false},
            {id: uniqid(), text: "the", spin: false},
            {id: uniqid(), text: "forests", spin: false},
            {id: uniqid(), text: "of", spin: true},
            {id: uniqid(), text: "the", spin: false},
            {id: uniqid(), text: "night,", spin: false},
            LINE_BREAK,
            {id: uniqid(), text: "What", spin: false},
            {id: uniqid(), text: "immortal", spin: false},
            {id: uniqid(), text: "hand", spin: false},
            {id: uniqid(), text: "or", spin: false},
            {id: uniqid(), text: "eye", spin: false},
            LINE_BREAK,
            {id: uniqid(), text: "Could", spin: false},
            {id: uniqid(), text: "frame", spin: true},
            {id: uniqid(), text: "thy", spin: false},
            {id: uniqid(), text: "fearful", spin: false},
            {id: uniqid(), text: "symmetry?", spin: false},
          ]
        },
        {
          title: 'The Tyger2',
          rawPoem: `Tiger, tiger, burning bright
          In the forests of the night,
          What immortal hand or eye
          Could frame thy fearful symmetry?`,
          id: uniqid(),
          isStuttering: false,
          stanza:  [
            {id: uniqid(), text: "Tiger,", spin: true},
            {id: uniqid(), text: "tiger,", spin: false},
            {id: uniqid(), text: "burning", spin: true},
            {id: uniqid(), text: "bright", spin: false},
            LINE_BREAK,
            {id: uniqid(), text: "In", spin: false},
            {id: uniqid(), text: "the", spin: false},
            {id: uniqid(), text: "forests", spin: false},
            {id: uniqid(), text: "of", spin: true},
            {id: uniqid(), text: "the", spin: false},
            {id: uniqid(), text: "night,", spin: true},
            LINE_BREAK,
            {id: uniqid(), text: "What", spin: false},
            {id: uniqid(), text: "immortal", spin: false},
            {id: uniqid(), text: "hand", spin: false},
            {id: uniqid(), text: "or", spin: false},
            {id: uniqid(), text: "eye", spin: false},
            LINE_BREAK,
            {id: uniqid(), text: "Could", spin: false},
            {id: uniqid(), text: "frame", spin: true},
            {id: uniqid(), text: "thy", spin: true},
            {id: uniqid(), text: "fearful", spin: false},
            {id: uniqid(), text: "symmetry?", spin: false},
          ]
        }
      ]
    }
    handleSetPoems(dummyUserObj);
  }, [])

 
  
 useEffect(() => {
   console.log('active-poem', allPoems.activePoem);
 }, [allPoems])
 
 useEffect(() => {
   console.log('render')
 })

  return (
    <div>
      <Header 
        toggleSideNavDisplay={toggleSideNavDisplay}
      />
      <SideNav 
        toggleSideNavDisplay={toggleSideNavDisplay}
        sideNavDisplay={sideNavDisplay}
        titles={titles}
        handleSetActivePoem={handleSetActivePoem}
      />
      <MainContainer2 
        activePoem={allPoems.activePoem}
      />
    </div>
  );
}

export default App;
