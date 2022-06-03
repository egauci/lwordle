export const DoneMessage = ({ word, finished, guess, index, guessCount, onAgainClick, onShareClick, stats }) => {
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
      <div className="done-buttons">
        <button onClick={onAgainClick}>Play Again</button>
        <button onClick={onShareClick}>Share</button>
      </div>
    </div>
  )
}
