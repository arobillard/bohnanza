import React from 'react';
import styled from 'styled-components';
import { UserTitle } from '../../../styles/Typography';
import UserField from '../user/UserField';
import UserFields from '../user/UserFields';

const PlayerFieldsStyles = styled.div`
  /* background-color: #aaa; */
  /* margin-bottom: ${({ theme }) => theme.spacers.half}rem; */
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function PlayerFields({ user }) {
  return (
    <PlayerFieldsStyles>
      <TitleWrap>
        <UserTitle>{user.name}</UserTitle>
        <strong>Coins: {user.coinCards.length || 0}</strong>
      </TitleWrap>
      <UserFields fields={user.fields} noFieldLabels />
    </PlayerFieldsStyles>
  );
}
