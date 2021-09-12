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


// if (intervalID) {
//   window.clearInterval(intervalID);
//   intervalID.current = null;
//   setIsStuttering(false);
// }
// setStanza(wordsOfStanza);