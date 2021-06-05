import { css } from 'styled-components';
import { bpScales, breakpointGenerateScales } from './Typography';

const spacerBase = 1.5;

const theme = {
  colors: {
    primary: '#a72536',
    primaryDark: '#641620',
    secondary: '#ebca3e',
    secondaryLight: '#f1db79',
    secondaryPale: '#f6eab1',
    secondaryDark: '#bfa532',
    orange: '#eb8a44',
    green: '#6ea31d',
    blue: '#181c75',
    purple: '#553274',
    pink: '#c0459f',
    turquoise: '#067674',
    white: '#fff'
  },
  fontSizes: {
    scale1: breakpointGenerateScales(bpScales, 5),
    scale2: breakpointGenerateScales(bpScales, 4),
    scale3: breakpointGenerateScales(bpScales, 3),
    scale4: breakpointGenerateScales(bpScales, 2),
    scale5: breakpointGenerateScales(bpScales, 1),
    small: css`
      font-size: 0.875rem;
    `,
    xSmall: css`
      font-size: 0.75rem;
    `,
  },
  fonts: {
    primary: '"Lato", sans-serif',
    secondary: '"Playfair Display", serif',
  },
  spacers: {
    sixth: spacerBase / 6,
    quarter: spacerBase / 4,
    third: spacerBase / 3,
    half: spacerBase / 2,
    twoThirds: (spacerBase / 3) * 2,
    threeQuarters: spacerBase * .75,
    x1: spacerBase,
    x2: spacerBase * 2,
    x3: spacerBase * 3,
    x4: spacerBase * 4,
    x5: spacerBase * 5,
    x6: spacerBase * 6,
  },
  mq: {
    s: 'only screen and (min-width: 25em)',
    sm: 'only screen and (min-width: 30em)',
    m: 'only screen and (min-width: 38em)',
    ml: 'only screen and (min-width: 50em)',
    l: 'only screen and (min-width: 60em)',
    xl: 'only screen and (min-width: 75em)',
    xxl: 'only screen and (min-width: 90em)',
  },
  radius: css`
    border-radius: ${spacerBase / 2}rem;
  `,
  transition: '.2s',
  container: css`
    width: min(85em, 100%);
    margin: 0 auto;
  `,
  shadow: '2px 2px 0 #0004',
  cardRatio: {
    h: '71.42857143%',
    v: '140%'
  }
};

export function applyUserColor(color, type = 'background-color') {
  return css`
    ${type}: ${({ theme }) => {
      if (color === 'red') {
        return theme.colors.primary
      } else if (color === 'yellow') {
        return theme.colors.secondary
      } else {
        return theme.colors[color];
      }
    }};
  `;
}

export default theme;