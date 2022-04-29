import logo from './logo.svg'
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [dims, setDims] = useState({ w: 0, h: 0 })
  useEffect(() => {
    setTimeout(() => {
      const el = document.querySelector('.App')
      const w = el.clientWidth
      const h = el.clientHeight
      setDims({w, h})
    }, 1000)
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Width: {dims.w}, Height: {dims.h}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
