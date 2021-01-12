import { cardList } from '../data/cards';

export function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export function generateDeck(gameOptions) {
  const deck = [];

  cardList.forEach((type, index) => {
    if (!gameOptions.removedCardTypes.includes(type.name)) {
      for (let i = 0; i < type.count; i += 1) {
        deck.push(index);
      }
    }
  });
  return deck;
}

// export function shuffleDeck(deck, callBack) {
//   const shuffledCards = shuffle(deck);
//   const completedDeck = [];
//   shuffledCards.forEach((card) => {
//     completedDeck.push(cardList[card]);
//   });
//   callBack(completedDeck);
// }

export function discard(card, discardPile, setDiscardPile) {
  const updatedDiscardPile = [...discardPile, card];
  setDiscardPile(updatedDiscardPile);
}
