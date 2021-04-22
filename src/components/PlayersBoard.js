import React from 'react';
import styled from 'styled-components';
import PlayerFields from './users/PlayerFields';
// import PlayerFields from './player/PlayerFields';

const PlayersBoardStyle = styled.div`
  grid-area: players;
  background-color: ${({ theme }) => theme.colors.secondaryPale};
  ${({ theme }) => theme.radius}
  overflow-y: scroll;
  /* height: min(35em, 100%); */
`;

const PBScroll = styled.div`
  /* overflow-y: scroll; */
  display: grid;
  padding: ${({ theme }) => theme.spacers.third}rem;
  @media ${({ theme }) => theme.mq.m} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${({ theme }) => theme.mq.l} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media ${({ theme }) => theme.mq.xl} {
    /* height: clamp(25em, 50vw, 45em); */
    grid-template-columns: 1fr 1fr;
  }
`;

export default function PlayersBoard({
  gameData,
  gameCode,
  myTurn,
  users,
  userData
}) {

  return (
    <PlayersBoardStyle>
      <PBScroll>
        {users.map((user) => user.userId !== userData.userId
          ?
          <PlayerFields
            key={`player-field-${user.userId}`}
            user={user}
            gameData={gameData}
          />
          :
          null
        )}
      </PBScroll>
    </PlayersBoardStyle>
  );
}
