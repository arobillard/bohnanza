import React from 'react';
import styled from 'styled-components';
import UserField from './UserField';
import UserFields from './UserFields';
import UserHand from './UserHand';
import UserPhaseControls from './UserPhaseControls';
import UserPot from './UserPot';
import UserScore from './UserScore';

const UserBoardStyle = styled.div`
  grid-area: user;
  background-color: #ccc;
  ${({ theme }) => theme.radius}
  /* padding: ${({ theme }) => theme.spacers.twoThirds}rem; */
  width: 100%;

  display: grid;
  column-gap: ${({ theme }) => theme.spacers.twoThirds}rem;
  align-items: flex-start;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'userFields userFields'
    'userHand userHand'
    'userPot userScore';
  @media ${({ theme }) => theme.mq.ml} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'userFields userFields userFields'
      'userHand userHand userHand'
      'userPot userPot userScore';
  }
  @media ${({ theme }) => theme.mq.l} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      'userFields userFields userFields userFields userScore userScore'
      'userHand userHand userHand userHand userPot userPot';
  }
  @media ${({ theme }) => theme.mq.xl} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'userFields userFields userFields'
      'userHand userHand userHand'
      'userPot userPot userScore';
  }
  /* @media ${({ theme }) => theme.mq.l} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      'userFields userFields userFields userFields userScore userScore'
      'userHand userHand userHand userHand userHand userHand'
      'userPot userPot userPot userPhase userPhase userPhase';
  }
  @media ${({ theme }) => theme.mq.xl} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      'userFields userFields userFields userFields userFields userFields'
      'userHand userHand userHand userHand userScore userScore'
      'userPot userPot userPot userPot userPot userPot'
      'userPhase userPhase userPhase userPhase userPhase userPhase';
  }
  @media ${({ theme }) => theme.mq.xxl} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      'userFields userFields userFields userFields userFields userFields'
      'userHand userHand userHand userHand userScore userScore'
      'userPot userPot userPot userPhase userPhase userPhase';
  } */
`;

export default function UserBoard({ thisUser, setThisUser }) {
  return (
    <UserBoardStyle>
      {thisUser ? (
        <>
          {thisUser.fields && (
            <UserFields
              fields={thisUser.fields}
              inUserBoard
              thisUser={thisUser}
              setThisUser={setThisUser}
            />
          )}
          {thisUser.hand && <UserHand hand={thisUser.hand} />}
          {thisUser.coinCards && (
            <UserScore score={thisUser.score} coinCards={thisUser.coinCards} />
          )}
          {thisUser.pot && <UserPot pot={thisUser.pot} />}
          {/* <UserPhaseControls /> */}
        </>
      ) : (
        <p style={{ gridColumn: '1 / -1' }}>
          Sorry, you are not on the user list!
        </p>
      )}
    </UserBoardStyle>
  );
}
