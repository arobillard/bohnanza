import styled from 'styled-components';
import { UserTitle } from '../../styles/Typography';
import Card from '../Card';

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
                actionable={gameData.turnPhase.phase === 3}
                plantType='userPot'
                userData={userData}
                gameCode={gameCode}
                gameData={gameData}
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