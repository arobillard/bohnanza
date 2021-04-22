import React from 'react';
import styled from 'styled-components';
import { cardList } from '../../../data/cards';
import { CardPHStyles } from '../../../styles/modules/Placeholders';
import { UserTitle } from '../../../styles/Typography';

const UserPotStyles = styled.div`
  grid-area: userPot;
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  /* overflow: hidden; */
  .card-wrap {
    display: grid;
    gap: ${({ theme }) => theme.spacers.third}rem;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    /* > div {
      width: 100%;
    } */
    /* @media ${({ theme }) => theme.mq.m} {
      flex-direction: row;
      flex-wrap: wrap;
      > div {
        width: min(10rem, 80%);
        margin-right: -25%;
        + div {
        }
      }
    } */
    /* @media ${({ theme }) => theme.mq.ml} {
      > div {
        width: min(15rem, 80%);
        margin-right: -12.5%;
        + div {
        }
      }
    } */
  }
`;

const PotCardPH = styled(CardPHStyles)`
  div {
    padding-top: 71.4286%;
  }
`;

export default function UserPot({ pot }) {
  let zIndex = pot.length + 1;
  return (
    <UserPotStyles>
      {/* <UserTitle>Your Pot</UserTitle> */}
      <div className="card-wrap">
        {pot.length > 0 &&
          pot.map((card) => {
            const cardData = cardList[card];
            zIndex -= 1;
            return (
              <PotCardPH key={`user-pot-${card}`} zIndex={zIndex}>
                <div>
                  <span>{cardData.name}</span>
                </div>
              </PotCardPH>
            );
          })}
      </div>
    </UserPotStyles>
  );
}
