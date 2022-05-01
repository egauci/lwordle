import { useEffect, useRef } from 'react'

export const initGuesses = [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ']
]
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
                  if (letCnt[td]) { // letter occurs in word
                    letCnt[td] -= 1
                    if (letr === td) {
                      cls = 'correct'  // occurs here
                    } else {
                      cls = 'place'   // occurs in a different spot
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
