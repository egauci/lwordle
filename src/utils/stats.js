const key = 'LWORDLESTATS'
const initStats = {
  played: 0,
  won: 0,
  lost: 0
}
export const getStats = () => {
  let stats = localStorage.getItem(key)
  if (stats) {
    try {
      stats = JSON.parse(stats)
    } catch (e) {
      stats = initStats
    }
  } else {
    stats = initStats
  }
  return stats
}

export const setStats = stats => {
  localStorage.setItem(key, JSON.stringify(stats))
}
