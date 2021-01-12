import { useState } from 'react';
import { cardList } from './data/cards';
import Boilerplate from './styles/Boilerplate';
import Typography from './styles/Typography';
import { generateDeck, discard, shuffle } from './utils/deck';

function App() {
  const [deck, setDeck] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);

  const [gameOptions, setGameOptions] = useState({
    players: 6,
    // removedCardTypes: ['Cocoa Bean', 'Wax Bean', 'Coffee Bean'],
    removedCardTypes: [],
  });

  function handleShuffle() {
    setDeck(shuffle(generateDeck(gameOptions)));
  }
  function handleDiscardShuffle() {
    setDeck(shuffle(discardPile));
    setDiscardPile([]);
  }

  function handleDiscard() {
    const num = Math.floor(Math.random() * cardList.length);
    discard(num, discardPile, setDiscardPile);
  }

  return (
    <>
      <Boilerplate />
      <Typography />
      <div className="App">
        <h1>Bohnanza</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button type="button" onClick={handleShuffle}>
          Shuffle Deck
        </button>
        <button type="button" onClick={handleDiscard}>
          Discard
        </button>
        <button type="button" onClick={handleDiscardShuffle}>
          Shuffle Discard
        </button>
      </div>
    </>
  );
}

export default App;
