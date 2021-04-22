import React from 'react';
import styled, { css } from 'styled-components';
import { cardList } from '../../../data/cards';
import { CardPH } from '../../../styles/modules/Placeholders';
import { UserTitle } from '../../../styles/Typography';
import EmptyField from './EmptyField';

const UserFieldStyles = styled.div`
  text-align: center;
`;

const PlantedField = styled.div`
  position: relative;
  .field-count {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    ${({ inUserBoard }) =>
      inUserBoard
        ? css`
            bottom: ${({ theme }) => theme.spacers.x1}rem;
            width: 3rem;
            height: 3rem;
          `
        : css`
            bottom: ${({ theme }) => theme.spacers.third}rem;
            width: 1.5rem;
            height: 1.5rem;
          `}
  }
`;

export default function UserField({
  fieldNum,
  field: { cardNum, numCards, active },
  noFieldLabels,
  thisUser,
  setThisUser,
  inUserBoard,
}) {
  const card = cardList[cardNum];

  return (
    <UserFieldStyles>
      {/* {!noFieldLabels && (
        <UserTitle>{card ? card.name : `Field ${fieldNum + 1}`}</UserTitle>
      )} */}
      {cardNum ? (
        <PlantedField inUserBoard={inUserBoard}>
          <CardPH text={card.name} />
          <div className="field-count">{numCards}</div>
        </PlantedField>
      ) : (
        <EmptyField
          inActive={!active}
          fieldNum={fieldNum}
          thisUser={thisUser}
          setThisUser={setThisUser}
          inUserBoard={inUserBoard}
        />
      )}
    </UserFieldStyles>
  );
}
