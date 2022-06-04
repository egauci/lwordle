# Lumina’s Wordle

## Background

My friend Lumina loves playing Wordle. However she was dismayed that there was only one word per day. I searched for apps and other solutions, but they are generally crawling with unpleasant ads. I decided to do a simple work-alike and non-commerial solution.

### Technical Background

This is a webapp initialized using create-react-app. It can be served by any static web server.

### The Words

I found a list of English words somewhere and filtered out anything that wasn’t exactly five letters long. Many of the words looked a little wonky, so I further filtered them against this api: https://api.dictionaryapi.dev/api/v2/entries/en/. I finally ended up with 2303 entries which I then shuffled so they are no longer in alphabetical order.

## Compatibility

Any modern browser should work. I’ve tested on iPhone with Safari, Chrome, and Edge and on Mac in Safari. The _share_ function requires browser support for _navigator.share_. Note that this web api requires a secure connection (https).

The game wants to be played in portrait aspect ratio.

## License

Worlde is owned by The New York Times. However, the many clones suggest that they don’t mind a little loving imitation. I won’t ever attempt to monetize this. If you stumble on this code, you may do whatever you want with it as far as I’m concerned. However The New York Times may have other thoughts and I cannot, and do not, speak for them.

The code uses this free dictionary API: https://dictionaryapi.dev. Please respect them and if you intend to make heavy use maybe chat with them first.

## Game Play

On loading, the player is presented with a picker which allows them to choose one of the 2303 entries. Left alone, the game uses local storage to proceed from 0 to 2302 and then start over. Optionally they can enter a number. This is useful for challenging friends to solve a specific puzzle.

Note: Since they can choose any of the puzzles it is obviously easy for players to “cheat”. That’s okay. Nobody’s watching 😼

Other than that, it is hopefully similar to the offical New York Times Wordle. The _enter_ key is enabled once you enter five letters and the word is reported as valid by the dictionary API.
