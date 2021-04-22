import styled from "styled-components"
import Card from "../Card";

const TradeOfferStyles = styled.div`
  grid-area: youOffer;
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.radius};
`;

export default function TradeOffer({
  userData,
  gameData,
  offer,
  setOffer,
  handReturn,
  setHandReturn,
  faceUpReturn,
  setFaceUpReturn
}) {

  let zIndex = offer?.length + 1 || 20;

  function removeFromOffer(card, i) {
    
    if (card.source === 'hand') {
      setHandReturn(card.position);
    } else if (card.source === 'faceUp') {
      setFaceUpReturn(card.position);
    }

    let updatedOffer = [];

    if (offer.length > 1) {
      updatedOffer = [
        ...offer.slice(0, i),
        ...offer.slice(i + 1)
      ];
    }

    setOffer(updatedOffer);
  }

  return (
    <TradeOfferStyles>
      <h3>Your offer...</h3>
      <div className="card-list-spaced">
      {
        offer.length === 0
        ?
        <div className="card-spacer-wrap">
          <div className="card-spacer"></div>
        </div>
        :
        offer.map((card, i) => {
          zIndex -= 1;
          return (
            <Card
              cardNum={card.cardNum}
              gameData={gameData}
              tradeCard={true}
              onClick={() => removeFromOffer(card, i)}
              zIndex={zIndex}
              width={{
                xs: '5rem',
                s: '6rem',
              }}
              key={`trade-offer-${i}`}
            />
        )})
      }
      </div>
    </TradeOfferStyles>
  )
}