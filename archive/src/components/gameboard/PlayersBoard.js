import React from 'react';
import styled from 'styled-components';
import PlayerFields from './player/PlayerFields';

const PlayersBoardStyle = styled.div`
  grid-area: players;
  background-color: #ccc;
  ${({ theme }) => theme.radius}
  overflow-y: scroll;
  /* height: min(35em, 100%); */
`;

const PBScroll = styled.div`
  /* overflow-y: scroll; */
  display: grid;
  gap: ${({ theme }) => theme.spacers.twoThirds}rem;
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
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

export default function PlayersBoard({ users, thisUser }) {
  return (
    <PlayersBoardStyle>
      <PBScroll>
        {users &&
          users.map(
            (user) =>
              user.id !== thisUser.id && (
                <PlayerFields key={`playerFields-${user.id}`} user={user} />
              )
          )}
      </PBScroll>
    </PlayersBoardStyle>
  );
}
