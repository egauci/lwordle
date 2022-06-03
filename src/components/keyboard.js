import classnames from 'classnames'

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'del']
]

// keyboard with different pres for unknown, letter not in word, letter in word somwhere,
// letter in word in known position
export const KeyBoard = ({ usedLetters, onClick, word, enterDisabled, delDisabled, finished }) => {

  const handleClick = e => {
    const b = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentElement
    const val = b.value
    onClick(val)
  }

  if (!word || finished) {
    return null
  }
  return (
    <div className="keyboard">
      {
        keys.map((row, rowix) => {
          return (
            <div key={rowix} className={`row${rowix}`}>
              {
                row.map(letr => {
                  let cls = (letr === 'enter' || letr === 'del') ? 'action' : 'letter'
                  cls = classnames(cls, usedLetters[letr])
                  return (
                    <button
                      value={letr}
                      key={letr}
                      className={cls}
                      onClick={handleClick}
                      disabled={(letr === 'enter' && enterDisabled)  || (letr === 'del' && delDisabled)}
                    >
                      {letr}
                    </button>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}
