import { useState } from "react";
import styled, { css } from "styled-components";
import { cardList } from "../data/cards";
import { plantCard } from "../utils/users";
import Button from "./Button";

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
    .card-design {
      position: absolute;
      background-color: #fff;
      border: 2px solid ${({ theme }) => theme.colors.primary};
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
      top: ${({ theme }) => theme.spacers.half}rem;
      left: ${({ theme }) => theme.spacers.half}rem;
      width: calc(100% - ${({ theme }) => theme.spacers.x1}rem);
      height: calc(100% - ${({ theme }) => theme.spacers.x2}rem);
      background-color: ${({ theme }) => theme.colors.secondary};
    }
    span {
      position: absolute;
      bottom: ${({ theme }) => theme.spacers.quarter}rem;
      font-family: ${({ theme }) => theme.fonts.secondary};
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      width: calc(100% - ${({ theme }) => theme.spacers.x1}rem);
    }
    .field-count {
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-family: ${({ theme }) => theme.fonts.secondary};
      ${({ inUserBoard }) =>
        inUserBoard
          ? css`
              top: ${({ theme }) => theme.spacers.x1}rem;
              ${({ theme }) => theme.fontSizes.scale4};
              width: 3rem;
              height: 3rem;
              span {
                margin-top: -.5rem;
              }
            `
          : css`
              bottom: ${({ theme }) => theme.spacers.third}rem;
              width: 1.5rem;
              height: 1.5rem;
            `}
    }
  }
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

export const CardMiniWrap = styled.div`
  display: flex;
`;

const CardMiniStyles = styled.div`
  ${({ cWidth }) =>
    cWidth &&
    Object.keys(cWidth).map((size) => {
      if (size === 'xs') {
        return css`
          width: ${cWidth[size]}rem;
          + div {
            margin-left: -${cWidth[size]  * .5}rem;
          }
        `;
      }
      return css`
        @media ${({ theme }) => theme.mq[size]} {
          width: ${cWidth[size]}rem;
          + div {
            margin-left: -${cWidth[size] * .5}rem;
          }
        }
      `;
    })}
  z-index: ${({ zIndex }) => zIndex};
  position: relative;
  .card-embed {
    padding-top: ${({ theme }) => theme.cardRatio.v};
    position: relative;
  }
  .card-style {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: .5rem;
    border: 2px solid ${({ borderColor, theme }) => {
      if (!borderColor || borderColor === 'red') {
        return theme.colors.primary;
      } else if (borderColor === 'yellow') {
        return theme.colors.secondary;
      } else {
        return theme.colors[borderColor];
      }
    }}
  }
`;

export function CardMini({
  cardNum,
  width,
  borderColor,
  zIndex
}) {
  return (
    <CardMiniStyles
      cWidth={width}
      borderColor={borderColor}
      zIndex={zIndex}
    >
      <div className="card-embed">
        <div className="card-style">
          <span className="screen-reader-text">{cardList[cardNum].name}</span>
        </div>
      </div>
    </CardMiniStyles>
  )
}

export default function Card({ 
  cardNum,
  width,
  zIndex,
  rotate,
  actionable,
  plantFromHand,
  plantType,
  inField,
  userData,
  gameData,
  gameCode,
  handleHarvest,
  numCards,
  inUserBoard,
  fieldNum,
  onClick
}) {

  const card = cardList[cardNum];
  const [selected, setSelected] = useState(false);

  function handleCardClick() {
    if (actionable && !selected) {
      setSelected(true);
    } 
  }

  function handlePlant() {
    if (plantType === 'hand') {
      plantFromHand(cardNum);
    } else {
      plantCard(cardNum, userData, plantType, gameData, gameCode)
    }
    setSelected(false);
  }

  function cancelSelect() {
    setSelected(false);
  }

  return (
    <CardStyles
      cWidth={width}
      zIndex={zIndex}
      rotate={rotate}
      onClick={onClick || handleCardClick}
      inUserBoard={inUserBoard}
    >
      <div className="card-embed">
        <div className="card-design">
          <div className="card-image-wrap">
            <span>{card.name}</span>
          </div>
        </div>
        {
          numCards
          &&
          <div className="field-count">
            <span>{numCards}</span>
          </div>
        }
      </div>
      {
        selected
        &&
        <CardOptions>
          {
            inField
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