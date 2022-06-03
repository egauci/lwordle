import { useEffect, useRef } from 'react'

export const initGuesses = [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ']
]

const lookAhead = (tr, td, tdix, letCnt) => {
  // is this letter's only remaining occurrance an exact match later in the word?
  if (letCnt > 1) {
    return false
  }
  let i = tdix + 1
  while (i < 5) {
    if (tr[i] === td) {
      return true
    }
    i += 1
  }
  return false
}

// table of guesses, with classNames for showing progress
export const Guesses = ({ guesses, word, letters, currentLine }) => {

  const letterCount = useRef({})

  useEffect(() => {
    // count the number of times a letter occurs in the target word
    if (!word) {
      return
    }
    const res = {}
    letters.forEach(l => {
      res[l] = res[l] ? res[l] + 1 : 1
    })
    letterCount.current = res
  }, [word, letters])

  if (!word) {
    return null
  }

  return <table className="guess-table">
    <tbody>
      {
        guesses.map((tr, trix) => {
          if (trix > 5) {
            return null
          }
          const letCnt = Object.assign({}, letterCount.current)
          return <tr key={trix}>
            {
              tr.map((td, tdix) => {
                let cls = ''
                if (td !== ' ' && trix !== currentLine) {
                  const letr = letters[tdix]
                  if (letr === td) {
                    cls = 'correct'
                    letCnt[td] -= 1
                  } else {
                    if (letCnt[td]) { // letter occurs in word
                      if (!lookAhead(tr, td, tdix, letCnt[td])) {
                        letCnt[td] -= 1
                        cls = 'place'   // occurs in a different spot
                      }
                    }
                  }
                }
                return <td key={tdix} className={cls}>{td}</td>
              })
            }
          </tr>
        })
      }
    </tbody>
  </table>
}

Guesses.forSharing = (guesses, letters, currentLine, index) => {
  const letterCount = {}
  letters.forEach(l => {
    letterCount[l] = letterCount[l] ? letterCount[l] + 1 : 1
  })

  const res = guesses.map((tr, trix) => {
    if (trix >= currentLine) {
      return ''
    }
    const line = tr.map((td, tdix) => {
      const letCnt = Object.assign({}, letterCount)
      const letr = letters[tdix]
      if (letr === td) {
        letCnt[td] -= 1
        return '🟩'
      } else {
        if (letCnt[td]) {
          if (!lookAhead(tr, td, tdix, letCnt[td])) {
            letCnt[td] -= 1
            return '🟨'
          }
        }
      }
      return '⬛'
    })
    return `${line.join('')}\n`
  })

  return `Lumina's Wordle ${index} ${currentLine}/6\n\n${res.join('')}`
}
