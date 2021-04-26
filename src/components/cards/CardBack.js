import styled, { css } from "styled-components";

const CardBackStyles = styled.div`
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
  .card-embed {
    position: relative;
    padding-top: ${({ theme, rotate }) => (rotate ? theme.cardRatio.h : theme.cardRatio.v)};
    .card-design {
      position: absolute;
      background-color: #fff;
      border: 2px solid ${({ theme }) => theme.colors.primary};
      ${({ theme }) => theme.radius};
      text-align: center;
      background-image: url('/images/cards/card-back-v.jpg');
      background-size: contain;
      background-position: center;
      ${({ theme, rotate }) => (rotate ?
        css`
          width: ${theme.cardRatio.h};
          height: ${theme.cardRatio.v};
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(${({ tilt }) => tilt || '90deg'});
        `
        :
        css`
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        `
      )}
      /* ${({ tilt, rotate }) => {
        if (tilt && !rotate) {
          return css`
            transform: rotate(${({ tilt }) => tilt});
          `
        }
      }} */
    }
  }
`;

export default function CardBack({
  rotate,
  width,
  tilt
}) {
  return (
    <CardBackStyles
      rotate={rotate}
      cWidth={width}
      tilt={tilt}
    >
      <div className="card-embed">
        <div className="card-design">

        </div>
      </div>
    </CardBackStyles>
  )
}