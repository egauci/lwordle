export const initGuesses = [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ']
  ]

export const Guesses = ({ guesses, word, letters, currentLine }) => {
  if (!word) {
    return null
  }
  return <table className="guess-table">
    <tbody>
      {
        guesses.map((tr, trix) => {
          return <tr key={trix}>
            {
              tr.map((td, tdix) => {
                let cls = ''
                if (trix !== currentLine) {
                  const letr = letters[tdix]
                  if (letr === td) {
                    cls = 'correct'
                  } else {
                    if (letters.indexOf(td) !== -1) {
                      cls = 'place'
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
