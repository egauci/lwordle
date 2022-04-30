/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import words from '../assets/words.json'

const storageKey = 'LWORDLE'

export const PickWord = ({ word, onClick, playCount }) => {
  const [lWord, setLWord] = useState()

  useEffect(() => {
    let lastWord = localStorage.getItem(storageKey)
    if (lastWord === undefined || lastWord === null) {
      lastWord = -1
    }
    if (typeof lastWord === 'string') {
      lastWord = Number(lastWord)
    }
    if (lastWord >= words.length - 1) {
      lastWord = -1;
    }
    setLWord(lastWord + 1)
  }, [playCount])

  const handleChange = e => {
    const val = e.target.value
    let nval = Number(val)
    if (nval >= words.length - 1) {
      nval = words.length - 1
    }
    setLWord(nval)
  }

  const handleClick = e => {
    e.preventDefault()
    localStorage.setItem(storageKey, String(lWord))
    onClick(words[lWord], lWord)
  }

  if (word) {
    return null
  }

  return (
    <form className='pick-word-form'>
      <label htmlFor='pick-word-input'>Select Wordle (0 to {words.length - 1})</label>
      <input type='number' value={String(lWord)} onChange={handleChange} id='pick-word-input' />
      <button className='pick-word-button' type='button' onClick={handleClick}>Go!</button>
    </form>
  )
}

/*
PickWord.find = w => {
  if (words.indexOf(w) !== -1) {
    return true
  }
  return false
}
*/
