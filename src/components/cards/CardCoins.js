import styled, { css } from 'styled-components';
import { applyUserColor } from '../../styles/Theme';

const CardCoinsStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacers.third}rem ${({ theme }) => theme.spacers.quarter}rem;
  .coins-wrap {
    display: flex;
    flex-direction: column-reverse;
  }
  .coins-unit + .coins-unit {
    margin-left: ${({ theme }) => theme.spacers.half}rem;
  }
  p {
    margin: 0;
    ${({ theme }) => theme.fontSizes.small}
    line-height: 1;
    font-family: ${({ theme }) => theme.fonts.secondary};
    text-align: center;
    font-weight: bold;
  }
  ${({ location }) => location === 'faceUp' && css`
    transform: scale(.8);
    @media ${({ theme }) => theme.mq.s} {
      transform: scale(1);
    }
    @media ${({ theme }) => theme.mq.xl} {
      transform: scale(.9);
    }
  `}
`;

const CoinStyle = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid #333;
  box-shadow: 0 2px 0 ${({ theme }) => theme.colors.primary};
  /* border: 1px solid ${({ theme }) => theme.colors.primary}; */
  ${applyUserColor('yellow')}
  transform: rotateX(45deg);
  &:not(:last-child) {
    margin-top: -.75rem;
  }
  &:nth-child(2) {
    transform: rotateX(45deg) translateX(.05rem);
  }
  &:nth-child(3) {
    transform: rotateX(45deg) translateX(-.05rem);
  }
`;

export default function CardCoins({
  coins,
  name,
  keyBase,
  location
}) {
  return (
    <CardCoinsStyles
      location={location}
    >
      {Object.keys(coins).map((num, i) => {
        let j = 0;
        const visualCoins = [];

        while (j < coins[num]) {
          visualCoins.push(1)
          j += 1;
        }

        return (
          <div
            key={`${keyBase}-coins-${i}`}
            className="coins-unit"
            aria-label={`${num} ${name} cards is worth ${coins[num]} points.`}
          >
            <div className="coins-wrap">
              {visualCoins.map((coin, k) => (
                <CoinStyle
                key={`${keyBase}-coins-${i}-coin-${k}`}
                />
              ))}
            </div>
            <p>{num}</p>
          </div>
        )
      })}
    </CardCoinsStyles>
  )
}