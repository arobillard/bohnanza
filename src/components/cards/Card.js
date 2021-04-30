import { useState } from "react";
import styled, { css } from "styled-components";
import { cardList } from "../../data/cards";
import { applyUserColor } from "../../styles/Theme";
import { plantCard } from "../../utils/users";
import Button from "../Button";
import CardCoins from "./CardCoins";

const CardStyles = styled.div`
  flex-shrink: 0;
  position: relative;
  ${({ cWidth }) =>
    cWidth &&
    Object.keys(cWidth).map((size) => {
      if (size === 'xs') {
        return css`
          width: ${cWidth[size]};
        `;
      }
      return css`
        @media ${({ theme }) => theme.mq[size]} {
          width: ${cWidth[size]};
        }
      `;
    })}
  ${({ zIndex }) =>
    zIndex &&
    css`
      position: relative;
      z-index: ${zIndex};
    `};
  .card-embed {
    position: relative;
    padding-top: ${({ theme, rotate }) => (rotate ? theme.cardRatio.h : theme.cardRatio.v)};
  }
  .card-design {
    position: absolute;
    background-color: #fff;
    border: 2px solid;
    ${({ textColor }) => applyUserColor(textColor, 'border-color')}
    ${({ theme }) => theme.radius};
    text-align: center;
    ${({ theme, rotate }) => (rotate ?
      css`
        width: ${theme.cardRatio.h};
        height: ${theme.cardRatio.v};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(90deg);
      `
      :
      css`
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      `
    )}
  }
  .card-image-wrap {
    position: absolute;
    top: ${({ theme }) => theme.spacers.third}rem;
    left: ${({ theme }) => theme.spacers.third}rem;
    width: calc(100% - ${({ theme }) => theme.spacers.twoThirds}rem);
    padding-top: calc(135% - 3rem - 4px);
    border: 2px solid;
    overflow: hidden;
    ${({ textColor }) => applyUserColor(textColor, 'border-color')}
    ${({ textColor }) => {
      if (textColor === 'yellow' || textColor === 'green') {
        return css`
          background-color: black;
        `;
      }
    }}
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
      object-position: center bottom;
    }
  }
  .card-name {
    position: absolute;
    /* bottom: ${({ theme }) => theme.spacers.quarter}rem; */
    bottom: 0;
    font-family: ${({ theme }) => theme.fonts.secondary};
    ${({ theme }) => theme.fontSizes.small};
    font-weight: bold;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    /* text-shadow: 0 0 20px #000; */
    width: 100%;
    ${({ textColor }) => applyUserColor(textColor, 'color')}
    ${({ cardName }) => cardName === 'Black-Eyed' && css`
      white-space: nowrap;
      span {
        display: none;
      }
    `}
  }
  .field-count {
    position: absolute;
    z-index: 1;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-family: ${({ theme }) => theme.fonts.secondary};
    /* color: ${({ theme }) => theme.colors.primary}; */
    ${({ userColor }) => applyUserColor(userColor, 'color')}
    text-shadow: 1px 1px 0 #0004;
    top: 0;
    left: 0;
    transform: none;
    ${({ theme }) => theme.fontSizes.scale3};
    width: 3rem;
    height: 3rem;
    span {
      margin-top: -.5rem;
    }
  }
  .card-count {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #fff;
    ${({ textColor }) => applyUserColor(textColor, 'color')}
    text-shadow: 1px 1px 0 #0004; 
    ${({ theme }) => theme.fontSizes.scale5};
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-family: ${({ theme }) => theme.fonts.secondary};
    span {
      margin-top: -.25rem;
    }
  }
  ${({ location, textColor }) => location === 'userField' && css`
    .card-image-wrap::before {
      content: ' ';
      position: absolute;
      top: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
      left: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
      width: calc(3rem + 4px);
      height: calc(3rem + 4px);
      ${applyUserColor(textColor)}
      border-radius: 50%;
      z-index: 1;
    }
    .card-image-wrap::after {
      content: ' ';
      position: absolute;
      right: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
      top: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
      width: calc(2.5rem + 4px);
      height: calc(2.5rem + 4px);
      ${applyUserColor(textColor)}
      border-radius: 50%;
    }
  `}
  ${({ location, textColor }) => location === 'hand' && css`
    .card-image-wrap::after {
      content: ' ';
      position: absolute;
      right: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
      top: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
      width: calc(2.5rem + 4px);
      height: calc(2.5rem + 4px);
      ${applyUserColor(textColor)}
      border-radius: 50%;
    }
  `}
  ${({ location, textColor }) => {
    if (location === 'hand' || location === 'discardPile') { 
      return css`
        .card-image-wrap::after {
        content: ' ';
        position: absolute;
        right: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
        top: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
        width: calc(2.5rem + 4px);
        height: calc(2.5rem + 4px);
        ${applyUserColor(textColor)}
        border-radius: 50%;
      }
      `
    }
  }}
  ${({ location, textColor }) => {
    if (location === 'discardPile') { 
      return css`
        opacity: .5;
      }
      `
    }
  }}
  ${({ location, cardName }) => {
    if (location === 'userPot' || location === 'tradeBoard') { 
      return css`
        .card-image-wrap {
          padding-top: calc(135% - 1.5rem - 4px);
        }
        .card-name {
          ${cardName === 'Black-Eyed' && css`
            font-size: .8rem;
            bottom: .125rem;
          `}
          span {
            display: none;
          }
        }
      `
    }
  }}
  ${({ location, textColor }) => location === 'faceUp' && css`
    .card-image-wrap::after {
      content: ' ';
      position: absolute;
      right: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
      top: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
      width: calc(2.5rem + 4px);
      height: calc(2.5rem + 4px);
      ${applyUserColor(textColor)}
      border-radius: 50%;
    }
    /* .card-count {
      bottom: 2px;
      top: auto;
      transform: rotate(90deg);
    } */
    .
  `}
  ${({ location, textColor, cardName }) => location === 'playerField' && css`
    .card-image-wrap {
      height: calc(100% - 2rem);
      padding-top: 0;
      &::before {
        content: ' ';
        position: absolute;
        top: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
        left: calc(-${({ theme }) => theme.spacers.third}rem - 4px);
        width: calc(2rem + 4px);
        height: calc(2rem + 4px);
        ${applyUserColor(textColor)}
        border-radius: 50%;
        z-index: 1;
      }
    }
    .card-name {
      ${cardName === 'Black-Eyed' && css`
        @media only screen and (max-width: 24.999rem) {
          font-size: .75rem;
          bottom: .15rem;
        }
      `}
      span {
        display: none;
      }
    }
    .field-count {
      width: 2rem;
      height: 2rem;
    }
    @media ${({ theme }) => theme.mq.xl} {
      .card-image-wrap {
        top: ${({ theme }) => theme.spacers.sixth}rem;
        left: ${({ theme }) => theme.spacers.sixth}rem;
        width: calc(100% - ${({ theme }) => theme.spacers.third}rem);
        padding-top: calc(135% - 1rem - 4px);
        &::before {
          bottom: 0;
          left: 50%;
          top: auto;
          transform: translate(-50%, calc(50% + 6px));
          width: calc(1.5rem + 4px);
          height: calc(1.5rem + 4px);
        }
      }
      .field-count {
        top: auto;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1.5rem;
      }
      .card-name {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
    }
  `}
  /* ${({ location, textColor, cardName }) => location === 'tradeBoard' && css`
    .card-image-wrap {
      height: calc(100% - 2rem);
      padding-top: 0;
    }
  `} */
`;

const CardOptions = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.radius};
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  background-color: #fffa;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  z-index: 1;
  button:first-child {
    margin-bottom: ${({ theme }) => theme.spacers.twoThirds}rem;
  }
`;

export const CardActivator = styled.div`
  background-color: #fff;
  ${({ theme }) => theme.radius};
  overflow: hidden;
  ${({ disabled }) => disabled && css`
    > div > div::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fffd;
      z-index: 100;
    }
  `}
`;

export default function Card({ 
  actionable,
  cardNum,
  fieldNum,
  gameCode,
  gameData,
  handleHarvest,
  index,
  inUserBoard,
  location,
  numCards,
  onClick,
  plantFromHand,
  rotate,
  userData,
  width,
  zIndex,
}) {

  const card = cardList[cardNum];
  const [selected, setSelected] = useState(false);

  function handleCardClick() {
    if (actionable && !selected && gameData?.turnPhase?.phase1?.planted === 0) {
      plantFromHand(cardNum);
    } else if (actionable && !selected) {
      setSelected(true);
    }
  }

  function handlePlant() {
    if (location === 'hand') {
      plantFromHand(cardNum);
    } else {
      plantCard(cardNum, userData, location, gameData, gameCode)
    }
    setSelected(false);
  }

  function cancelSelect() {
    setSelected(false);
  }

  return (
    <CardStyles
      location={location}
      cWidth={width}
      zIndex={zIndex}
      rotate={rotate}
      onClick={onClick || handleCardClick}
      inUserBoard={inUserBoard}
      textColor={card.textColor}
      userColor={userData?.bohnanza.color}
      cardName={card.name}
    >
      <div className="card-embed">
        <div className="card-design">
          <div className="card-image-wrap">
            <img src={`/images/cards/${card.img}`} alt={`${card.name} Bean`} />
            {
              location === 'hand'
              ||
              location === 'userField'
              ||
              location === 'faceUp'
              ||
              location === 'discardPile'
              ?
              <span className="card-name">{card.name}<span> Bean</span></span>
              :
              null
            }
          </div>
        {
          numCards
          &&
          <div className="field-count">
            <span>{numCards}</span>
          </div>
        }
        {
          location === 'playerField'
          ||
          location === 'userPot'
          ||
          location === 'tradeBoard'
          ?
          <span className="card-name">{card.name}<span> Bean</span></span>
          :
          null
        }
        {
          location === 'hand'
          ||
          location === 'userField'
          ||
          location === 'faceUp'
          ||
          location === 'discardPile'
          ?
          <>
            <div className="card-count"><span>{card.count}</span></div>
            <CardCoins
              coins={card.score}
              name={card.name}
              keyBase={index}
              location={location}
            />
          </>
          :
          null
        }
        </div>
      </div>
      {
        selected
        &&
        <CardOptions>
          {
            location === 'userField'
            ?
            <Button onClick={(e) => handleHarvest(cardNum, numCards, fieldNum)}>Harvest</Button>
            :
            <Button onClick={handlePlant}>Plant</Button>
          }
          <Button color='secondary' onClick={cancelSelect}>Cancel</Button>
        </CardOptions>
      }
    </CardStyles>
  );
}