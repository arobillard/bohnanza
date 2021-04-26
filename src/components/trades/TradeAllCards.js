import styled from "styled-components"
import { cardList } from "../../data/cards";
import Card from "../cards/Card";

const TradeAllCardsStyles = styled.div`
  grid-area: allCards;
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  ${({ theme }) => theme.radius}
  .text-wrap {
    @media ${({ theme }) => theme.mq.l} {
      display: flex;
      align-items: flex-end;
      p {
        margin-bottom: .875rem;
        margin-left: ${({ theme }) => theme.spacers.half}rem;
      }
    }
  }
  .all-cards-wrap {
    display: grid;
    gap: ${({ theme }) => theme.spacers.third}rem;
    --cols: 3;
    grid-template-columns: repeat(var(--cols), 1fr);
    @media ${({ theme }) => theme.mq.s} {
      --cols: 4;
    }
    @media ${({ theme }) => theme.mq.m} {
      --cols: 6;
    }
    @media ${({ theme }) => theme.mq.l} {
      --cols: 11;
    }
  }
`;

export default function TradeAllCards({
  want,
  setWant
}) {

  function addToWant(card) {

    const cardInfo = {
      cardNum: card,
      source: 'hand',
      position: null
    }

    const updatedWant = [
      ...want,
      cardInfo
    ]
    setWant(updatedWant);
  }

  return (
    <TradeAllCardsStyles>
      <div className="text-wrap">
        <h3>All Card Types</h3>
        <p>Click on a card that your would like to receive.</p>
      </div>
      <div className="all-cards-wrap">
        {Object.keys(cardList).map((card, i) => (
          <Card
            cardNum={i}
            location="tradeBoard"
            tradeCard={true}
            onClick={() => addToWant(i)}
            key={`all-cards-list-${i}`}
          />
        ))}
      </div>
    </TradeAllCardsStyles>
  )
}