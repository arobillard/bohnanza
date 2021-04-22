import { cardList } from '../data/cards';

export function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export function generateDeck() {
  const deck = [];

  cardList.forEach((type, index) => {
    for (let i = 0; i < type.count; i += 1) {
      deck.push(index);
    }
  });
  
  return deck;
}