import { useEffect, useState } from "react";
import styled from "styled-components";
import Card, { CardActivator } from "../Card";

const TradeFaceUpStyles = styled.div`
  grid-area: faceUp;
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
`;

export default function TradeFaceUp({
  gameData,
  offer,
  setOffer,
  want,
  setWant,
  myTurn,
  faceUpReturn,
  setFaceUpReturn
}) {

  const [faceUps, setFaceUps] = useState([]);

  useEffect(() => {
    const updatedFaceUps = [];

    gameData.faceUp.forEach(card => {
      updatedFaceUps.push({
        cardNum: card,
        addedToTrade: false
      })
    })

    setFaceUps(updatedFaceUps);

  }, [gameData])

  useEffect(() => {

    if (faceUpReturn !== null && faceUpReturn !== undefined) {
      const updatedFaceUps = [...faceUps];
      updatedFaceUps[faceUpReturn].addedToTrade = false;
      setFaceUps(updatedFaceUps);
      setFaceUpReturn(null);
    }

  }, [faceUpReturn, faceUps, setFaceUpReturn])

  function addToOffer(card, i) {

    const cardInfo = {
      cardNum: card.cardNum,
      source: 'faceUp',
      position: i
    }

    if (myTurn) {
      const updatedOffer = [
        ...offer,
        cardInfo
      ]
      setOffer(updatedOffer);
    } else {
      const updatedWant = [
        ...want,
        cardInfo
      ]
      setWant(updatedWant);
    }

    const updatedFaceUps = [...faceUps];

    updatedFaceUps[i].addedToTrade = true;
    setFaceUps(updatedFaceUps);
  }


  return (
    <TradeFaceUpStyles>
      <h3>Face Up</h3>
      <div className="card-list-spaced">
        {faceUps.map((card, i) => (
          <CardActivator key={`trade-faceUp-${i}`} disabled={card.addedToTrade}>
            <Card
              cardNum={card.cardNum}
              gameData={gameData}
              tradeCard={true}
              onClick={() => card.addedToTrade === false && addToOffer(card, i)}
              width={{
                xs: '5rem',
                s: '6rem',
              }}
            />
          </CardActivator>
        ))}
      </div>
    </TradeFaceUpStyles>
  )
}