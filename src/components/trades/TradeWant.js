import styled from "styled-components"
import Card from "../cards/Card";

const TradeWantStyles = styled.div`
  grid-area: youWant;
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  ${({ theme }) => theme.radius};
`;

export default function TradeWant({
  gameData,
  want,
  setWant,
  setHandReturn,
  setFaceUpReturn
}) {

  let zIndex = want?.length + 1 || 20;

  function removeFromWant(card, i) {
    
    if (card.source === 'hand') {
      setHandReturn(card.position);
    } else if (card.source === 'faceUp') {
      setFaceUpReturn(card.position);
    }

    let updatedWant = [];

    if (want.length > 1) {
      updatedWant = [
        ...want.slice(0, i),
        ...want.slice(i + 1)
      ];
    }

    setWant(updatedWant);
  }

  return (
    <TradeWantStyles>
      <h3>Your want...</h3>
      <div className="card-list-spaced">
        {
          want.length === 0
          ?
          <div className="card-spacer-wrap">
            <div className="card-spacer"></div>
          </div>
          :
          want.map((card, i) => {
              zIndex -= 1;
              return (
                <Card
                  cardNum={card.cardNum}
                  location="tradeBoard"
                  gameData={gameData}
                  tradeCard={true}
                  onClick={() => removeFromWant(card, i)}
                  zIndex={zIndex}
                  width={{
                    xs: '5rem',
                    s: '6rem',
                  }}
                  key={`trade-Want-${i}`}
                />
            )})
        }
      </div>
    </TradeWantStyles>
  )
}