import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { cardList } from '../../../data/cards';
import { CardPH } from '../../../styles/modules/Placeholders';
import { handleTrade, exchangeCards } from '../../../utils/trades';
import Button from '../../Button';

const TradeCardStyles = styled.div`
  grid-column: span 4;
  padding: ${({ theme }) => theme.spacers.half}rem;
  ${({ theme }) => theme.radius};
  background-color: #bbb;
  ${({ yourMessage }) =>
    yourMessage &&
    css`
      background-color: #666;
      color: #fff;
    `}
  ${({ status }) => {
    if (status === 'rejected') {
      return css`
        background-color: #daa;
        opacity: 0.5;
      `;
    }
    if (status === 'accepted') {
      return css`
        background-color: #ada;
      `;
    }
  }}
  .trade-wrap {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    row-gap: 0.5rem;
  }
  .from {
  }
  .to {
    text-align: right;
  }
  .arrows {
    align-self: center;
  }
  .btn-wrap-decline {
    grid-column: 3 / 4;
  }
  .full-span {
    grid-column: 1 / -1;
  }
`;

const CardTitle = styled.h3`
  ${({ theme }) => theme.fontSizes.small}
  margin: 0;
  font-weight: 400;
`;

const UserName = styled.h4`
  margin: 0;
  font-size: 1rem;
`;

const TradeItemStyles = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacers.quarter}rem;
  .mini-card-wrap {
    display: inline-flex;
    flex-shrink: 0;
    margin-right: ${({ theme }) => theme.spacers.quarter}rem;
    > div + div {
      margin-left: -1.5rem;
    }
  }
  .quantity,
  .card-name {
    margin: 0;
  }
  ${({ reversed }) =>
    reversed &&
    css`
      flex-direction: row-reverse;
      .mini-card-wrap {
        margin-left: ${({ theme }) => theme.spacers.quarter}rem;
        margin-right: 0;
        justify-content: flex-end;
      }
    `}
`;

function TradeItem({ card, reversed }) {
  const phCards = [];
  let i = 0;

  while (i < card.count) {
    phCards.push(i);
    i += 1;
  }

  return (
    <TradeItemStyles reversed={reversed}>
      <div className="mini-card-wrap">
        <CardPH text={card.count} width={{ xs: '2rem' }} />
      </div>
      <div>
        <p className="card-name">
          {card.name}
          {card.count > 1 && 's'}
        </p>
      </div>
    </TradeItemStyles>
  );
}

export default function TradeCard({
  trade,
  trades,
  tradeRef,
  setTrades,
  yourMessage,
  users,
  setUsers,
  thisUser,
}) {
  const { from, fromAccept, give, to, toAccept, get, status } = trade;

  const [acceptText, setAcceptText] = useState('Accept');

  const giveCards = {};
  const getCards = {};

  give.forEach((card) => {
    if (giveCards[card.card]) {
      giveCards[card.card].count += 1;
    } else {
      giveCards[card.card] = {
        ...cardList[card.card],
        count: 1,
      };
    }
  });

  get.forEach((card) => {
    if (getCards[card.card]) {
      getCards[card.card].count += 1;
    } else {
      getCards[card.card] = {
        ...cardList[card.card],
        count: 1,
      };
    }
  });

  function handleAccept() {
    const response = handleTrade(
      'accept',
      tradeRef,
      trades,
      trade,
      setTrades,
      thisUser,
      users
    );
    if (response === 'accepted') {
      exchangeCards(from, give, to, get, users, setUsers);
    } else if (response === 'Unable to Trade') {
      setAcceptText('Unable to Accept');
    }
  }

  function handleReject() {
    handleTrade('reject', tradeRef, trades, trade, setTrades, thisUser);
  }

  // function handleTrade(response) {
  //   const updatedTrade = { ...trade };
  //   if (response === 'reject') {
  //     updatedTrade.status = 'rejected';
  //   } else if (updatedTrade.from === thisUser.id) {
  //     updatedTrade.fromAccept = true;
  //   } else if (updatedTrade.to === thisUser.id) {
  //     updatedTrade.toAccept = true;
  //   }
  //   if (updatedTrade.fromAccept && updatedTrade.toAccept) {
  //     updatedTrade.status = 'accepted';
  //   }
  //   const updatedTrades = [...trades];
  //   updatedTrades[tradeRef] = updatedTrade;
  //   setTrades(updatedTrades);
  // }

  // function exchangeCards() {

  // }

  return (
    <TradeCardStyles yourMessage={yourMessage} status={status}>
      <CardTitle>Trade</CardTitle>
      <div className="trade-wrap">
        <div className="from">
          <UserName>{users[from].name}</UserName>
          {Object.keys(giveCards).map((card, i) => (
            <TradeItem
              key={`giveCards-${tradeRef}-${i}`}
              card={giveCards[card]}
            />
          ))}
        </div>
        <div className="arrows">
          {'<'}
          <br />
          {'>'}
        </div>
        <div className="to">
          <UserName>{users[to].name}</UserName>
          {Object.keys(getCards).map((card, i) => (
            <TradeItem
              key={`getCards-${tradeRef}-${i}`}
              card={getCards[card]}
              reversed
            />
          ))}
        </div>
        {status === 'pending' &&
          ((from === thisUser.id && fromAccept === false) ||
            (to === thisUser.id && toAccept === false)) && (
            <>
              <div className="btn-wrap-accept">
                <Button onClick={handleAccept} fullWidth>
                  {acceptText}
                </Button>
              </div>
              <div className="btn-wrap-decline">
                <Button onClick={handleReject} fullWidth cancel>
                  Reject
                </Button>
              </div>
            </>
          )}
        {status === 'pending' && from === thisUser.id && fromAccept && (
          <div className="full-span">
            <p style={{ margin: 0, textAlign: 'center' }}>
              Waiting on {users[to].name} to accept...
            </p>
          </div>
        )}
        {status === 'pending' && to === thisUser.id && toAccept && (
          <div className="full-span">
            <p style={{ margin: 0, textAlign: 'center' }}>
              Waiting on {users[from].name} to accept...
            </p>
          </div>
        )}
        {status === 'pending' && from !== thisUser.id && to !== thisUser.id && (
          <div className="full-span">
            <p style={{ margin: 0, textAlign: 'center' }}>
              This trade is pending...
            </p>
          </div>
        )}
        {status === 'accepted' && (
          <div className="full-span">
            <p style={{ margin: 0, textAlign: 'center' }}>
              This trade was accepted.
            </p>
          </div>
        )}
        {status === 'rejected' && (
          <div className="full-span">
            <p style={{ margin: 0, textAlign: 'center' }}>
              This trade was rejected.
            </p>
          </div>
        )}
      </div>
    </TradeCardStyles>
  );
}
