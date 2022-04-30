export const DoneMessage = ({ word, finished, guess, index, guessCount, onClick, stats }) => {
  if (!word || !finished) {
    return null
  }
  let msg
  if (word === guess) {
    msg = <p>Yay! you won lwordle #{index} in {guessCount} tries</p>
  } else {
    msg = <><p>Oh well, better luck next time.</p><p>The word was {word}</p></>
  }
  return (
    <div className="done-message">
      {msg}
      <div className="stats">
        played: {stats.played}<br />
        won: {stats.won}<br />
        lost: {stats.lost}
      </div>
      <div><button onClick={onClick}>Play Again</button></div>
    </div>
  )
}
