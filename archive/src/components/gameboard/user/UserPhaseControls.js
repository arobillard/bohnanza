import React from 'react';
import styled from 'styled-components';
import { UserTitle } from '../../../styles/Typography';
import Button from '../../Button';

const UPCStyles = styled.div`
  grid-area: userPhase;
  background-color: #555;
  color: #fff;
  ${({ theme }) => theme.radius}
  padding: ${({ theme }) => theme.spacers.x1}rem;
  h2 {
    margin: 0;
  }
`;

const SmallText = styled.p`
  ${({ theme }) => theme.fontSizes.small}
`;

export default function UserPhaseControls() {
  return (
    <UPCStyles>
      <UserTitle>Phase 1 - Plant</UserTitle>
      <SmallText>
        You must play the first card in your hand. You may optionally play the
        second card as well.
      </SmallText>
      <Button fullWidth>Next Phase</Button>
    </UPCStyles>
  );
}
