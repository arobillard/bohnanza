import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { cardList } from '../../data/cards';
import { arrayObjectSort } from '../../utils/helpers'
import { applyUserColor } from '../../styles/Theme';
import CardMini from '../cards/CardMini';
import TradeUserAcceptButton from './TradeUserAcceptButton';
import Button from '../Button';
import { acceptTrade, checkTrade, fulfillTrade, rejectTrade } from '../../utils/trades';

const TradeDisplayStyles = styled.div`
  grid-column: span 12;
  padding: ${({ theme }) => theme.spacers.half}rem;
  ${({ theme }) => theme.radius}
  ${({ color }) => applyUserColor(color)}
  ${({ rejected }) => rejected && css`
    opacity: .25;
  `}
  ${({ accepted }) => accepted && css`
    opacity: .5;
  `}
  color: #fff;
  @media ${({ theme }) => theme.mq.m} {
    grid-column: span 9;
    ${({ myTrade }) => myTrade && css`
      grid-column: 4 / span 9;
    `}
  }
  @media ${({ theme }) => theme.mq.l} {
    grid-column: span 8;
    ${({ myTrade }) => myTrade && css`
      grid-column: 5 / span 8;
    `}
  }
  h3 {
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
  }
  h4 {
    ${({ theme }) => theme.fontSizes.scale5}
    margin: 0;
  }
  .trade-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas:
      'give arrows get'
      'buttons buttons buttons';
    row-gap: ${({ theme }) => theme.spacers.third}rem;
    .cell-give {
      grid-area: give;
    }
    .cell-get {
      grid-area: get;
      text-align: right;
      .nothing-text {
        margin-top: ${({ theme }) => theme.spacers.twoThirds}rem;
        display: block;
        font-weight: bold;
      }
    }
    .cell-buttons {
      grid-area: buttons;
      display: flex;
      align-items: center;
      h3 {
        margin-right: ${({ theme }) => theme.spacers.third}rem;
        &.push-r {
          margin-right: auto;
        }
      }
      .reject-message,
      .accept-message {
        margin: 0 auto;
        text-align: center;
        padding: ${({ theme }) => theme.spacers.third}rem 0;
      }
      .accept-message {
        font-weight: bold;
        ${({ theme }) => theme.fontSizes.scale5}
        text-transform: uppercase;
      }
    }
    .card-type-wrap {
      display: flex;
      align-items: center;
      &.get {
        justify-content: flex-end;
      }
      p {
        line-height: 1.1;
      }
      div + p {
        margin: 0 0 0 ${({ theme }) => theme.spacers.third}rem;
      }
      p:first-child {
        margin: 0 ${({ theme }) => theme.spacers.third}rem 0 0;
      }
      span {
        font-weight: bold;
        display: block;
      }
    }
    .push-l-auto {
      margin-left: auto;
    }
  }
`;


function ConfirmedUser({ from, userData, tradeData, users }) {

  function handleFromConfirm() {
    acceptTrade(tradeData, 'fromAccept');
  }

  function handleToConfirm() {
    const toHand = users.filter(u => u.userId === tradeData?.confirmedTo)[0].bohnanza.hand;
    
    const canAccept = checkTrade(toHand, tradeData);

    if (canAccept) {
      acceptTrade(tradeData, 'toAccept');
      console.log('to can accept!')
    } else {
      console.log('cannot accept')
    }
  }

  function handleCancel() {
    rejectTrade(tradeData, userData.name);
  }

  let waitingOn = 'players';

  if (tradeData?.fromAccept) {
    waitingOn = users.filter(u => u.userId === tradeData?.confirmedTo)[0].name;
  }

  if (tradeData?.toAccept) {
    waitingOn = users.filter(u => u.userId === tradeData?.from)[0].name;
  }

  if (from.userId === userData.userId && !tradeData?.fromAccept) {
    return (
      <>
        <h3 className="push-r">Confirm trade:</h3>
        <Button
          onClick={handleFromConfirm}
          color={from?.bohnanza.color === 'red' ? 'secondary' : null}
        >
          Confirm
        </Button>
        <Button
          onClick={handleCancel}
          cancel={true}
          textColor="white"
        >
          Cancel
        </Button>
      </>
    )
  }
  if (userData.userId === tradeData.confirmedTo && !tradeData?.toAccept) {
    return (
      <>
        <h3 className="push-r">Confirm trade:</h3>
        <Button
          onClick={handleToConfirm}
          color={from?.bohnanza.color === 'red' ? 'secondary' : null}
        >
          Accept
        </Button>
        <Button
          onClick={handleCancel}
          cancel={true}
          textColor="white"
        >
          Decline
        </Button>
      </>
    )
  }
  return (
    <>
      <h3>Waiting for {waitingOn} to confirm trade...</h3>
    </>
  )
}

export default function TradeDisplay({
  tradeId,
  tradeData,
  gameData,
  gameCode,
  users,
  userData,
}) {

  // const tradeData = gameData.trades.filter(t => t.tradeId === tradeId)[0];
  const from = users.filter(u => u.userId === tradeData?.from)[0];
  const sortedTo = tradeData ? arrayObjectSort(tradeData?.to, 'userId') : [];

  const [give, setGive] = useState(null);
  const [get, setGet] = useState(null);

  const myTurn = gameData.turn === userData.userId;
  const myTrade = from?.userId === userData?.userId;

  const [fulfilling, setFulfilling] = useState(false);

  useEffect(() => {
    const updatedGive = {};
    tradeData?.give.forEach(card => {
      if (updatedGive[card.cardNum]) {
        updatedGive[card.cardNum].count += 1;
      } else {
        updatedGive[card.cardNum] = {
          count: 1,
          name: cardList[card.cardNum].name
        }
      }
    })
    setGive(updatedGive);

    const updatedGet = {};
    tradeData?.get.forEach(card => {
      if (updatedGet[card.cardNum]) {
        updatedGet[card.cardNum].count += 1;
      } else {
        updatedGet[card.cardNum] = {
          count: 1,
          name: cardList[card.cardNum].name
        }
      }
    })
    setGet(updatedGet);

    if (tradeData?.toAccept && tradeData?.fromAccept && !tradeData?.fulfilled && from?.userId === userData?.userId && !fulfilling) {
      setFulfilling(true);
      fulfillTrade(gameData, gameCode, tradeData, users);
    }

  }, [tradeData, userData?.userId, from?.userId, users, gameData, gameCode, fulfilling])

  function handleCancel() {
    rejectTrade(tradeData, userData.name);
  }

  function giveTitle() {
    if (tradeData?.confirmedTo) {
      const userGive = users.filter(u => u.userId === tradeData?.confirmedTo)[0];
      return `${userGive.name} gets`;
    } else if (userData.userId === from?.userId) {
      return 'You offer';
    } else {
      return `${from?.name} offers`;
    }
  }

  function getTitle() {
    if (tradeData?.confirmedTo && userData.userId === from?.userId) {
      return 'You get';
    } else if (userData.userId === from?.userId) {
      return 'You want';
    } else if (tradeData?.confirmedTo && userData.userId !== from?.userId) {
      return `${from?.name} gets`;
    } else {
      return `${from?.name} wants`;
    }
  }

  function userHandling() {
    if (tradeData?.rejected) {
      return (
        <p className="reject-message">Trade was cancelled by {tradeData?.rejector}.</p>
      )
    } else if (tradeData?.toAccept && tradeData.fromAccept) {
      return (
        <p className="accept-message">Trade accepted</p>
      )
    } else if (tradeData?.confirmedTo) {
      return (
        <ConfirmedUser
          from={from}
          userData={userData}
          tradeData={tradeData}
          users={users}
        />
      )
    } else {
      return (
        <>
        <h3>Offered to:</h3>
        {sortedTo?.map((user, i) => {
          const singleUser = users.filter(u => u.userId === user.userId)[0];
          return (
            <TradeUserAcceptButton
              key={`trade-user-accept-btn-${i}`}
              tradeData={tradeData}
              singleUser={singleUser}
              userTrade={user}
              myTurn={myTurn}
              myAccept={userData.userId === user.userId}
            />
          )
        })}
        {
          myTurn
          &&
          <div className="push-l-auto">
            <Button
              type="button"
              onClick={handleCancel}
              textColor='white'
              cancel
            >
              Cancel
            </Button>
          </div>
        }
      </>
      )
    }
  }

  return (
    <TradeDisplayStyles
      color={from?.bohnanza.color}
      rejected={tradeData?.rejected}
      accepted={tradeData?.fromAccept && tradeData?.toAccept}
      myTrade={myTrade}
    >
      <h3>Trade</h3>
      <div className="trade-grid">
        <div className="cell-give">
          <h4>
            {giveTitle()}
          </h4>
          {give && Object.keys(give).map((cardNum, i) => {
            const { count, name } = give[cardNum];
            return (
              <div
                className="card-type-wrap"
                key={`${tradeId}-give-${i}`}
              >
                <CardMini
                  cardNum={cardNum}
                  width={{ 'xs': 2 }}
                  borderColor={from?.bohnanza.color}
                  users={users}
                />
                <p>{count}x <span>{name}</span></p>
              </div>
            )
          })}
        </div>
        <div className="cell-get">
          <h4>
            {getTitle()}
          </h4>
          {
            get && Object.keys(get).length
            ? 
            Object.keys(get).map((cardNum, i) => {
              const { count, name } = get[cardNum];
              return (
                <div
                  className="card-type-wrap get"
                  key={`${tradeId}-give-${i}`}
                >
                  <p>{count}x <span>{name}</span></p>
                  <CardMini
                    cardNum={cardNum}
                    width={{ 'xs': 2 }}
                    borderColor={from?.bohnanza.color}
                  />
                </div>
              )
            })
            :
            <span className="nothing-text">Nothing!</span>
          }
        </div>
        <div className="cell-buttons">
          {userHandling()}
        </div>
      </div>
    </TradeDisplayStyles>
  )
}