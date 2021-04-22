import { useEffect, useState } from "react";
import styled from "styled-components"
import Card, { CardActivator } from "../Card";

const TradeHandStyles = styled.div`
  grid-area: hand;
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
`;

export default function TradeHand({
  userData,
  gameData,
  offer,
  setOffer,
  handReturn,
  setHandReturn
}) {

  const [hand, setHand] = useState([]);

  useEffect(() => {
    const updatedHand = [];

    userData.bohnanza.hand.forEach(card => {
      updatedHand.push({
        cardNum: card,
        addedToTrade: false
      })
    })

    setHand(updatedHand);

  }, [userData])

  useEffect(() => {

    if (handReturn !== null && handReturn !== undefined) {
      const updatedHand = [...hand];
      updatedHand[handReturn].addedToTrade = false;
      setHand(updatedHand);
      setHandReturn(null);
    }

  }, [handReturn, hand, setHandReturn])

  function addToOffer(card, i) {

    const cardInfo = {
      cardNum: card.cardNum,
      source: 'hand',
      position: i
    }

    const updatedOffer = [
      ...offer,
      cardInfo
    ]
    setOffer(updatedOffer);

    const updatedHand = [...hand];

    updatedHand[i].addedToTrade = true;
    setHand(updatedHand);
  }

  let zIndex = hand?.length + 1 || 20;

  return (
    <TradeHandStyles>
      <h3>Your Hand</h3>
      <div className="card-list-overlap">
        {hand.map((card, i) => {
          zIndex -= 1;
          return (
          <CardActivator key={`trade-hand-${i}`} disabled={card.addedToTrade}>
            <Card
              cardNum={card.cardNum}
              gameData={gameData}
              tradeCard={true}
              onClick={() => card.addedToTrade === false && addToOffer(card, i)}
              zIndex={zIndex}
              width={{
                xs: '5rem',
                s: '6rem',
              }}
            />
          </CardActivator>
        )})}
      </div>
    </TradeHandStyles>
  )
}