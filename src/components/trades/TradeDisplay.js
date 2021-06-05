import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { cardList } from '../../data/cards';
import { arrayObjectSort } from '../../utils/helpers'
import { applyUserColor } from '../../styles/Theme';
import TradeUserAcceptButton from './TradeUserAcceptButton';
import Button from '../Button';
import { acceptTrade, checkTrade, fulfillTrade, rejectTrade } from '../../utils/trades';
import Card from '../cards/Card';

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
    /* display: flex;
    align-items: center; */
    .material-icons {
      background-color: #fff;
      border-radius: 50%;
      ${({ color }) => applyUserColor(color, 'color')}
      font-size: 1rem;
      padding: .125rem;
      margin-right: .25rem;
    }
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


function ConfirmedUser({ 
  from,
  userData,
  tradeData,
  users,
  errors,
  setErrors
}) {

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
      setErrors([
        ...errors,
        {
          type: 'warning',
          msg: 'You do not have the cards needed to accept trade!'
        }
      ])
    }
  }

  function handleCancel() {
    rejectTrade(tradeData.tradeId, userData.name);
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
  errors,
  setErrors
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
    rejectTrade(tradeData.tradeId, userData.name);
  }

  function giveTitle() {
    if (tradeData?.confirmedTo) {
      const userGive = users.filter(u => u.userId === tradeData?.confirmedTo)[0];
      return (
        <>
          {tradeData?.toAccept ? <i className="material-icons">check</i> : '' }
          {userGive.name} gets
        </>
      )
    } else if (userData.userId === from?.userId) {
      return (
        <>
          {tradeData?.toAccept ? <i className="material-icons">check</i> : '' }
          You offer
        </>
      )
    } else {
      return (
        <>
          {tradeData?.toAccept ? <i className="material-icons">check</i> : '' }
          {from?.name} offers
        </>
      )
    }
  }

  function getTitle() {
    if (tradeData?.confirmedTo && userData.userId === from?.userId) {
      return (
        <>
          {tradeData?.fromAccept ? <i className="material-icons">check</i> : '' }
          You get
        </>
      )
    } else if (userData.userId === from?.userId) {
      return (
        <>
          {tradeData?.fromAccept ? <i className="material-icons">check</i> : '' }
          You want
        </>
      )
    } else if (tradeData?.confirmedTo && userData.userId !== from?.userId) {
      return (
        <>
          {tradeData?.fromAccept ? <i className="material-icons">check</i> : '' }
          {from?.name} gets
        </>
      )
    } else {
      return (
        <>
          {tradeData?.fromAccept ? <i className="material-icons">check</i> : '' }
          {from?.name} wants
        </>
      )
    }
  }

  function userHandling() {
    if (tradeData?.toAccept && tradeData.fromAccept) {
      return (
        <p className="accept-message">Trade accepted</p>
      )
    } else if (tradeData?.rejected) {
      return (
        <p className="reject-message">Trade was cancelled by {tradeData?.rejector}.</p>
      )
    } else if (tradeData?.confirmedTo) {
      return (
        <ConfirmedUser
          from={from}
          userData={userData}
          tradeData={tradeData}
          users={users}
          errors={errors}
          setErrors={setErrors}
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
              errors={errors}
              setErrors={setErrors}
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
                <Card
                  cardNum={cardNum}
                  location="trade"
                  actionable={false}
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
                  <Card
                    cardNum={cardNum}
                    location="trade"
                    actionable={false}
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