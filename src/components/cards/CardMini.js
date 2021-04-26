import styled, { css } from "styled-components";
import { cardList } from "../../data/cards";

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

export default function CardMini({
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