import React from 'react';
import styled from 'styled-components';

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'user'
    'message'
    'faceUp'
    'players';
  @media ${({ theme }) => theme.mq.m} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'user user user'
      'message message faceUp'
      'players players players';
  }
  @media ${({ theme }) => theme.mq.xl} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-template-areas:
      'user user user faceUp message message'
      'user user user faceUp message message'
      'user user user players players players'
      'user user user players players players'
      'user user user players players players';
    height: clamp(50em, calc(100vh - 4.5rem), 65em);
  }
  gap: ${({ theme }) => theme.spacers.twoThirds}rem;
  padding: ${({ theme }) => theme.spacers.x1}rem;
  ${({ theme }) => theme.container}
  height: 100%;
`;

export default function GameBoardGrid({ children }) {
  return <BoardGrid>{children}</BoardGrid>;
}
