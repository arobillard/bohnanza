import React from 'react';
import styled, { css } from 'styled-components';
import UserField from './UserField';

const UserFieldsStyles = styled.div`
  grid-area: userFields;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacers.half}rem;
  align-items: flex-end;
  ${({ inUserBoard }) =>
    inUserBoard &&
    css`
      padding: ${({ theme }) => theme.spacers.twoThirds}rem;
    `}
`;

export default function UserFields({
  fields,
  noFieldLabels,
  inUserBoard,
  thisUser,
  setThisUser,
}) {
  return (
    <UserFieldsStyles inUserBoard={inUserBoard}>
      {Object.keys(fields).map((field, i) => (
        <UserField
          key={`userField-${field}`}
          fieldNum={i}
          field={fields[field]}
          noFieldLabels={noFieldLabels}
          thisUser={thisUser}
          setThisUser={setThisUser}
          inUserBoard={inUserBoard}
        />
      ))}
    </UserFieldsStyles>
  );
}
