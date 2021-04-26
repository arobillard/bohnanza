import styled from 'styled-components';
import { UserTitle } from '../../styles/Typography';
import { plantCard } from '../../utils/users';
import Card from '../cards/Card';

const UserPotStyles = styled.div`
  grid-area: userPot;
  .pot-cards {
    display: flex;
    &-wrap {
      overflow-x: scroll;
    }
    > div + div {
      margin-left: -4rem;
      transition: margin ${({ theme }) => theme.transition};
      &:hover,
      &:focus {
        margin-left: -1rem;
      }
    }
  }
`;

export default function UserPot({
  userData,
  gameData,
  gameCode
}) {

  let zIndex = userData?.bohnanza?.pot.length + 1 || 20;

  function potPlant(card) {
    if (gameData.turnPhase.phase === 3) {
      plantCard(card, userData, 'userPot', gameData, gameCode)
    }
  }

  return (
    <UserPotStyles>
      <UserTitle>Your Pot</UserTitle>
      <div className="pot-cards-wrap">
        <div className="pot-cards">
          {userData?.bohnanza?.pot.map((card, i) => {
            zIndex -= 1;
            return (
              <Card
                key={`${userData.userId}-pot-${i}`}
                cardNum={card}
                location='userPot'
                actionable={gameData.turnPhase.phase === 3}
                plantType='userPot'
                userData={userData}
                gameCode={gameCode}
                gameData={gameData}
                onClick={() => potPlant(card)}
                zIndex={zIndex}
                width={{
                  xs: '6rem',
                }}
              />
            )
          })}
        </div>
      </div>
    </UserPotStyles>
  )
}