import { useState } from "react";
import styled, { css } from "styled-components"
import { setNewMessage } from "../../utils/database";
import { rejectTrade, setNewTrade } from "../../utils/trades";
import Button from "../Button";
import TradeAllCards from "./TradeAllCards";
import TradeFaceUp from "./TradeFaceUp";
import TradeHand from "./TradeHand";
import TradeOffer from "./TradeOffer";
import TradeUsers from "./TradeUsers";
import TradeWant from "./TradeWant";

const TradeBoardStyles = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(75em, calc(100% - 3rem));
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.secondaryPale};
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  ${({ theme }) => theme.radius}
  box-shadow: ${({ theme }) => theme.shadow};
  transition:
    transform ${({ theme }) => theme.transition},
    top ${({ theme }) => theme.transition};
  ${({ minimize }) => minimize && css`
    top: 100%;
    transform: translate(-50%, 0);
  `}
  .trade-board-scroller {
    max-height: 100vh;
    overflow-y: scroll;
  }
  .trade-board-grid {
    display: grid;
    gap: ${({ theme }) => theme.spacers.twoThirds}rem;
    grid-template-areas:
      'title'
      'users'
      'faceUp'
      'hand'
      'youOffer'
      'youWant'
      'allCards'
      'buttons';
    @media ${({ theme }) => theme.mq.l} {
      grid-template-columns: repeat(12, 1fr);
      grid-template-areas:
        'title title title title title title buttons buttons buttons buttons buttons buttons'
        'users users users faceUp faceUp faceUp hand hand hand hand hand hand'
        'youWant youWant youWant youWant youWant youWant youOffer youOffer youOffer youOffer youOffer youOffer'
        'allCards allCards allCards allCards allCards allCards allCards allCards allCards allCards allCards allCards';
    }
    h2 {
      grid-area: title;
      ${({ theme }) => theme.fontSizes.scale4}
      color: ${({ theme }) => theme.colors.primary};
      margin: 0;
    }
    h3 {
      ${({ theme }) => theme.fontSizes.scale5}
      margin-bottom: ${({ theme }) => theme.spacers.half}rem;
    }
    .trade-btns {
      grid-area: buttons;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .card-list-overlap {
      display: flex;
      > div + div {
        margin-left: -2rem;
        transition: margin-left ${({ theme }) => theme.transition};
        &:hover {
          margin-left: -.5rem;
        }
        @media ${({ theme }) => theme.mq.s} {
          margin-left: -2.5rem;
        }
        @media ${({ theme }) => theme.mq.m} {
          margin-left: -3rem;
        }
      }
    }
    .card-spacer-wrap {
      width: 5rem;
      @media ${({ theme }) => theme.mq.s} {
        width: 6rem;
      }
      .card-spacer {
        padding-top: ${({ theme }) => theme.cardRatio.v};
      }
    }
    .card-list-spaced {
      display: flex;
      div + div {
        margin-left: ${({ theme }) => theme.spacers.third}rem;
      }
    }
    .hand-offer-connecter {
      display: none;
      background-color: ${({ theme }) => theme.colors.secondaryLight};
      ${({ theme }) => theme.radius}
      @media ${({ theme }) => theme.mq.l} {
        display: block;
        grid-column: 7 / 13;
        grid-row: 2 / 4;
      }
    }
  }
  .minimizer {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    padding: ${({ theme }) => theme.spacers.third}rem ${({ theme }) => theme.spacers.x2}rem;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    border: 0;
    font-family: inherit;
    font-size: 1rem;
    border-radius: .75rem .75rem 0 0;
  }
  .trim {
    padding: ${({ theme }) => theme.spacers.x1}rem;
    border: 3px solid ${({ theme }) => theme.colors.primary};
  }
`;

const ClickClose = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #fffc;
  transition: background-color ${({ theme }) => theme.transition};
  ${({ minimize }) => minimize && css`
    background-color: #fff0;
    pointer-events: none;
  `}
`;

export default function TradeBoard({
  tradeBoardVisible,
  setTradeBoardVisible,
  userData,
  gameData,
  gameCode,
  users,
  errors,
  setErrors,
  myTurn,
  latestTrade,
  setLatestTrade
}) {

  const [minimize, setMinimize] = useState(false);
  const [offer, setOffer] = useState([]);
  const [want, setWant] = useState([]);
  const [handReturn, setHandReturn] = useState(null);
  const [faceUpReturn, setFaceUpReturn] = useState(null);

  function confirmOffer(e) {
    e.preventDefault();
    
    if (!offer.length) {
      const updatedErrors = [...errors];

      updatedErrors.push({
        msg: 'You must select at least one card that you to offer!',
        type: 'warning'
      })

      setErrors(updatedErrors);
      return;
    }

    const receivers = [];
    let confirmedTo = null;
    if (myTurn) {
      users.forEach(user => {
        if (user.userId !== userData.userId) {
          if (e.currentTarget[`user-picker-${user.userId}`].checked) {
            receivers.push({
              userId: user.userId,
              status: 'pending'
            });
          }
        }
      })
    } else {
      receivers.push({
        userId: gameData.turn,
        status: 'pending'
      });
      confirmedTo = gameData.turn;
    }

    if (!receivers.length) {
      const updatedErrors = [...errors];

      updatedErrors.push({
        msg: 'You must select at least one player for trade!',
        type: 'warning'
      })

      setErrors(updatedErrors);
      return;
    }

    if (receivers.length === 1) {
      confirmedTo = receivers[0].userId;
    }

    const tradeId = `${userData.userId}-${Math.floor((Math.random() * 10000))}`;

    const giveAway = offer.length > 0 && !want.length;

    const tradeData = {
      from: userData.userId,
      fromAccept: false,
      to: receivers,
      confirmedTo,
      toAccept: false,
      give: offer,
      get: want,
      rejected: false,
      rejector: '',
      fulfilled: false,
      tradeId,
      gameCode,
      giveAway
    }

    const tradeMessage = {
      userId: userData.userId,
      tradeId,
      type: 'trade',
    }

    if (latestTrade) {
      rejectTrade(latestTrade, userData.name);
    }
    setLatestTrade(tradeId);
    setNewMessage(tradeMessage, gameCode);
    setNewTrade(tradeData, gameCode);
    setTradeBoardVisible(false);
    setOffer([]);
    setWant([]);
  }

  function cancelTrade() {
    setTradeBoardVisible(false);
    setOffer([]);
    setWant([]);
  }

  function handleMinimize() {
    if (minimize) {
      setMinimize(false);
    } else {
      setMinimize(true);
    }
  }

  if (tradeBoardVisible) {
    return (
      <>
        <ClickClose
          // onClick={() => setTradeBoardVisible(false)}
          minimize={minimize}
        />
        <TradeBoardStyles onSubmit={confirmOffer} minimize={minimize}>
          <div className="trade-board-scroller">
            <div className="trade-board-grid">
              <h2>New Trade</h2>
              <TradeUsers
                users={users}
                userData={userData}
                gameData={gameData}
                myTurn={myTurn}
              />
              <TradeFaceUp
                gameData={gameData}
                offer={offer}
                setOffer={setOffer}
                want={want}
                setWant={setWant}
                myTurn={myTurn}
                faceUpReturn={faceUpReturn}
                setFaceUpReturn={setFaceUpReturn}
              />
              <div className="hand-offer-connecter"></div>
              <TradeHand
                userData={userData}
                gameData={gameData}
                offer={offer}
                setOffer={setOffer}
                handReturn={handReturn}
                setHandReturn={setHandReturn}
              />
              <TradeOffer
                userData={userData}
                gameData={gameData}
                offer={offer}
                setOffer={setOffer}
                setHandReturn={setHandReturn}
                setFaceUpReturn={setFaceUpReturn}
              />
              <TradeWant
                userData={userData}
                gameData={gameData}
                want={want}
                setWant={setWant}
                setHandReturn={setHandReturn}
                setFaceUpReturn={setFaceUpReturn}
              />
              <TradeAllCards
                setWant={setWant}
                want={want}
              />
              <div className="trade-btns">
                <Button type="submit">Confirm Offer</Button>
                <Button type="button" cancel={true} onClick={cancelTrade}>Cancel</Button>
              </div>
            </div>
          </div>
          <button type="button" className="minimizer" onClick={handleMinimize}>{minimize ? 'Re-Open' : 'Minimize'} Trade</button>
        </TradeBoardStyles>
      </>
    )
  }
  return null;
}