import React from 'react';
import styled, { css } from 'styled-components';
import { UserTitle } from '../../styles/Typography';
import UserFields from './UserFields';

const PlayerFieldsStyles = styled.div`
  /* background-color: #aaa; */
  /* margin-bottom: ${({ theme }) => theme.spacers.half}rem; */
  padding: ${({ theme }) => theme.spacers.sixth}rem;
  border: ${({ theme }) => theme.spacers.sixth}rem solid transparent;
  ${({ theme }) => theme.radius}
  ${({ theme, myTurn, color }) => {
    if (myTurn) {
      if (color === 'yellow') {
        return css`
          border-color: ${theme.colors.secondary};
        `
      } else if (color === 'red') {
        return css`
          border-color: ${theme.colors.primary};
        `
      }
      return css`
        border-color: ${theme.colors[color]};
      `
    }
  }}
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function PlayerFields({ user, gameData }) {
  return (
    <PlayerFieldsStyles myTurn={gameData.turn === user.userId} color={user.bohnanza.color}>
      <TitleWrap>
        <UserTitle>{user.name}</UserTitle>
        <strong>Coins: {user?.bohnanza.score?.length || 0}</strong>
      </TitleWrap>
      <UserFields userData={user} noFieldLabels />
    </PlayerFieldsStyles>
  );
}
