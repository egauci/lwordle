import './App.css'
import { useState, useEffect, useRef } from 'react'
import { PickWord } from './components'
import { initGuesses, Guesses } from './components'

function App() {
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [word, setWord] = useState('')
  const [guesses, setGuesses] = useState(initGuesses)
  const [currentLine, setCurrentLine] = useState(0)
  const [currentLetter, setCurrentLetter] = useState(0)
  const letters = useRef()

  useEffect(() => {
    setTimeout(() => {
      const el = document.querySelector('.App')
      const w = el.clientWidth
      const h = el.clientHeight
      setDims({w, h})
    }, 100)
  }, [])

  const handleWordSelect = word => {
    const w = word.toUpperCase()
    letters.current = w.split('')
    setWord(w)
    setGuesses(initGuesses)
  }

  console.log(guesses)

  return (
    <div className="App">
      <header>
        <h1>Lumina’s Wordle</h1>
      </header>
      <main>
        <PickWord word={word} onClick={handleWordSelect} />
        <Guesses
          guesses={guesses}
          word={word}
          letters={letters.current}
          currentLine={currentLine}
        />
      </main>
      {word && <p>The Word is: {word}</p>}
    </div>
  );
}

export default App;
