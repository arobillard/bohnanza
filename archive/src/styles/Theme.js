import { css } from 'styled-components';
import { bpScales, breakpointGenerateScales } from './Typography';

const spacerBase = 1.5;

export default {
  colors: {
    primary: '#cf3a4d',
    primaryDark: '#a72536',
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
    quarter: spacerBase / 4,
    third: spacerBase / 3,
    half: spacerBase / 2,
    twoThirds: (spacerBase / 3) * 2,
    x1: spacerBase,
    x2: spacerBase * 2,
    x3: spacerBase * 3,
    x4: spacerBase * 4,
    x5: spacerBase * 5,
    x6: spacerBase * 6,
  },
  mq: {
    s: 'only screen and (min-width: 25em)',
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
    width: min(75em, 100%);
    margin: 0 auto;
  `,
};
