import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../../Button';

const EmptyFieldStyles = styled.div`
  background-color: #ddd;
  padding-top: 140%;
  position: relative;
  ${({ theme }) => theme.radius};
  ${({ inActive }) =>
    inActive &&
    css`
      background-color: #d0d0d0;
    `}
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default function EmptyField({
  inActive,
  fieldNum,
  thisUser,
  setThisUser,
  inUserBoard,
}) {
  // const canAfford = users[thisUser].coinCards.length >= 3 || false;
  let canAfford = false;

  if (inUserBoard) {
    canAfford = thisUser.coinCards.length >= 3;
  }

  function handleBuyField() {
    const updatedUser = { ...thisUser };

    updatedUser.fields.field3.active = true;
    setThisUser(updatedUser);
  }

  return (
    <EmptyFieldStyles inActive={inActive}>
      <div>
        <span>
          {inActive
            ? `Field ${fieldNum + 1} Inactive`
            : `Field ${fieldNum + 1}`}
        </span>
        {inActive && inUserBoard && (
          <Button onClick={handleBuyField} disabled={!canAfford}>
            Buy
          </Button>
        )}
      </div>
    </EmptyFieldStyles>
  );
}
