import React from 'react';
import styled from 'styled-components';
import { CardPH } from '../../../styles/modules/Placeholders';
import { UserTitle } from '../../../styles/Typography';

const UserHandStyles = styled.div`
  grid-area: userHand;
  width: 100%;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  .card-scroller {
    overflow-x: scroll;
  }
  .card-wrap {
    display: flex;
    > div + div {
      margin-left: -4rem;
      transition: margin-left ${({ theme }) => theme.transition};
      &:hover {
        margin-left: -1rem;
      }
      @media ${({ theme }) => theme.mq.s} {
        margin-left: -5rem;
      }
      @media ${({ theme }) => theme.mq.m} {
        margin-left: -6rem;
      }
    }
  }
`;

export default function UserHand({ hand }) {
  let zIndex = hand.length + 1;

  return (
    <UserHandStyles cards={hand.length}>
      {/* <UserTitle>Your Hand</UserTitle> */}
      <div className="card-scroller">
        <div className="card-wrap">
          {hand.map((card, i) => {
            zIndex -= 1;
            return (
              <CardPH
                key={`user-hand-${i}`}
                cardNum={card}
                width={{
                  xs: '6rem',
                  s: '8rem',
                  m: '10rem',
                }}
                zIndex={zIndex}
              />
            );
          })}
        </div>
      </div>
    </UserHandStyles>
  );
}
