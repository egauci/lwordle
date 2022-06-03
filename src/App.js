import cloneDeep from 'clone-deep'
import axios from 'axios'
import './App.css'
import { useState, useRef } from 'react'
import { PickWord } from './components'
import { initGuesses, Guesses, KeyBoard, DoneMessage } from './components'
import { getStats, setStats } from './utils'

function App() {
  const [word, setWord] = useState('')
  const [index, setIndex] = useState(-1)
  const [guesses, setGuesses] = useState(cloneDeep(initGuesses))
  const [currentLine, setCurrentLine] = useState(0)
  const [currentLetter, setCurrentLetter] = useState(0)
  const [usedLetters, setUsedLetters] = useState({})
  const [finished, setFinished] = useState(false)
  const [playCount, setPlayCount] = useState(0)
  const [enterDisabled, setEnterDisabled] = useState(true)
  const letters = useRef()
  const baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

  const handleWordSelect = (word, ix) => {
    const w = word.toUpperCase()
    letters.current = w.split('')
    setWord(w)
    setIndex(ix)
    setGuesses(cloneDeep(initGuesses))
  }

  const handlKeyClick = async val => {
    if (val === 'del') {
      setGuesses(g => {
        g[currentLine][currentLetter - 1] = ' '
        return g
      })
      setCurrentLetter(Math.max(0, currentLetter - 1))
      setEnterDisabled(true)
      return
    }
    if (val !== 'enter') {
      if (currentLetter >= 5) {
        return
      }
      setGuesses(g => {
        g[currentLine][currentLetter] = val
        return g
      })
      if (currentLetter >= 4) { // full line entered, make sure it's a dictionary word
        const tline = [...guesses[currentLine]]
        tline[4] = val
        const tword = tline.join('').toLowerCase()
        const url = `${baseUrl}${tword}`
        try {
          const { data } = await axios.get(url)
          if (Array.isArray(data) && data[0].word === tword) {
            setEnterDisabled(false) // current word found in dictionary, let them submit it
          }
        } catch (e) {
          setEnterDisabled(true)
        }
      } else {
        setEnterDisabled(true)
      }
      setCurrentLetter(Math.min(5, currentLetter + 1))
      return
    }
    // process enter
    const line = [...guesses[currentLine]]
    setUsedLetters(u => {
      line.forEach((letr, letix) => {
        let typ
        if (letr === letters.current[letix]) {
          typ = 'correct'
        } else {
          if (letters.current.indexOf(letr) !== -1) {
            typ = u[letr] === 'correct' ? 'correct' : 'place' // handle repeated letters
          } else {
            typ = 'unused' // does not occur in word at all
          }
        }
        u[letr] = typ
      })
      return u
    })
    const stats = getStats()
    if (word === line.join('')) {
      setFinished(true)
      stats.won += 1
      stats.played += 1
   } else {
      if (currentLine >= 5) {
        setFinished(true)
        stats.lost += 1
        stats.played += 1
      }
    }
    setStats(stats)
    setCurrentLine(currentLine + 1)
    setCurrentLetter(0)
  }

  const handleAgainClick = () => {
    setPlayCount(c => c + 1)
    setGuesses(cloneDeep(initGuesses))
    setUsedLetters({})
    setCurrentLetter(0)
    setCurrentLine(0)
    setFinished(false)
    setIndex(-1)
    setEnterDisabled(true)
    setWord('')
  }

  const handleShareClick = () => {
    const r = Guesses.forSharing(guesses, letters.current, currentLine, index)
    navigator.share({text: r})
  }

  return (
    <div className="App">
      <header>
        <h1>Lumina’s Wordle</h1>
      </header>
      <main>
        <PickWord word={word} onClick={handleWordSelect} playCount={playCount} />
        <Guesses
          guesses={guesses}
          word={word}
          letters={letters.current}
          currentLine={currentLine}
        />
        <KeyBoard
          usedLetters={usedLetters}
          word={word}
          enterDisabled={enterDisabled}
          delDisabled={currentLetter === 0}
          onClick={handlKeyClick}
        />
        <DoneMessage
          finished={finished}
          word={word}
          index={index}
          guessCount={currentLine}
          guess={!finished ? '' : guesses[currentLine - 1].join('')}
          onAgainClick={handleAgainClick}
          onShareClick={handleShareClick}
          stats={!finished ? null : getStats()}
        />
      </main>
    </div>
  );
}

export default App;
