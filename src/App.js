import './App.css'
import { useState, useEffect } from 'react'
import { PickWord } from './components/pickword'

function App() {
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [word, setWord] = useState('')

  useEffect(() => {
    setTimeout(() => {
      const el = document.querySelector('.App')
      const w = el.clientWidth
      const h = el.clientHeight
      setDims({w, h})
    }, 100)
  }, [])

  const handleWordSelect = word => {
    setWord(word)
  }

  return (
    <div className="App">
      <header>
        <h1>Lumina’s Wordle</h1>
      </header>
      {!word && <PickWord onClick={handleWordSelect} />}
      {word && <p>The Word is: {word}</p>}
    </div>
  );
}

export default App;
