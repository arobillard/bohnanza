import styled from "styled-components";
import { UserTitle } from "../../styles/Typography";
import { progressPhase } from "../../utils/database";
import { plantCard } from "../../utils/users";
import Card from "../cards/Card";

const UserHandStyles = styled.div`
  grid-area: userHand;
  width: 100%;
  overflow: hidden;
  /* padding: ${({ theme }) => theme.spacers.twoThirds}rem; */
  .card-scroller {
    overflow-x: scroll;
  }
  .card-wrap {
    display: flex;
    > div + div {
      margin-left: -4rem;
      transition: margin-left ${({ theme }) => theme.transition};
      &:hover {
        margin-left: -1rem;
      }
      @media ${({ theme }) => theme.mq.s} {
        margin-left: -5rem;
      }
      @media ${({ theme }) => theme.mq.m} {
        margin-left: -6rem;
      }
    }
  }
`;

export default function UserHand({
  userData,
  gameData,
  myTurn,
  setErrors,
  gameCode
}) {

  const hand = userData.bohnanza.hand;
  let zIndex = hand?.length + 1 || 20;

  async function plantFromHand(cardNum) {
    const cardPlanted = await plantCard(cardNum, userData, 'hand');
    if (cardPlanted) {
      progressPhase(gameCode, gameData, 'handPlant');
    }
  }

  return (
    <UserHandStyles cards={hand?.length}>
      <UserTitle>Your Hand</UserTitle>
      <div className="card-scroller">
        <div className="card-wrap">
          {hand.map((card, i) => {
            zIndex -= 1;
            return (
              <Card
                key={`user-hand-${i}`}
                index={`user-hand-${i}`}
                cardNum={card}
                gameData={gameData}
                location='hand'
                width={{
                  xs: '7rem',
                  s: '8rem',
                  m: '10rem',
                }}
                zIndex={zIndex}
                actionable={myTurn && i === 0 && gameData.turnPhase.phase === 1}
                setErrors={setErrors}
                plantFromHand={plantFromHand}
                plantType="hand"
                userData={userData}
                inUserBoard
              />
            );
          })}
        </div>
      </div>
    </UserHandStyles>
  )
}