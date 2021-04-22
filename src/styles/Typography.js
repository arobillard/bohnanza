import styled, { createGlobalStyle, css } from 'styled-components';

function typeScale(scale, step, units = 'rem', dir = 'up') {
  let val = 1;
  for (let i = 0; i < step; i += 1) {
    if (dir === 'down') {
      val /= scale;
    } else {
      val *= scale;
    }
  }
  val = Math.ceil(val * 100) / 100;
  return `${val}${units}`;
}

export const bpScales = [
  { size: 0, scale: 1.2 },
  { size: 38, scale: 1.25 },
  { size: 60, scale: 1.333 },
];

export function breakpointGenerateScales(typeScales, step) {
  const breakpoints = [];
  typeScales.forEach((bp) => {
    if (bp.size === 0) {
      breakpoints.push(`font-size: ${typeScale(bp.scale, step)};`);
    } else {
      breakpoints.push(
        `@media only screen and (min-width: ${
          bp.size
        }em) {font-size: ${typeScale(bp.scale, step)};}`
      );
    }
  });
  const condensedBPs = breakpoints.join('');
  return condensedBPs;
}

const h1Styles = css`
  font-family: ${({ theme }) => theme.fonts.secondary};
  ${breakpointGenerateScales(bpScales, 5)}
  font-weight: 900;
  text-shadow: ${({ theme }) => theme.shadow};
`;

const h2Styles = css`
  font-family: ${({ theme }) => theme.fonts.secondary};
  text-shadow: ${({ theme }) => theme.shadow};
  ${breakpointGenerateScales(bpScales, 4)}
`;

const h3Styles = css`
  ${breakpointGenerateScales(bpScales, 3)}
`;

const h4Styles = css`
  ${breakpointGenerateScales(bpScales, 2)}
`;

const h5Styles = css`
  ${breakpointGenerateScales(bpScales, 1)}
`;

export const UserTitle = styled.h2`
  ${({ theme }) => theme.fontSizes.scale5}
  margin-bottom: ${({ theme }) => theme.spacers.quarter}rem;
  color: ${({ theme }) => theme.colors.primary};
  ${({ textAlign }) => textAlign && css`
    text-align: ${textAlign};
  `}
`;

const Typography = createGlobalStyle`

  html {
    font-size: 1rem;
    line-height: 1.5;
    font-family: ${({ theme }) => theme.fonts.primary};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  dl,
  dd,
  figure,
  blockquote,
  details,
  hr,
  fieldset,
  pre,
  table,
  caption,
  menu {
    margin: 0 0 1.5rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    line-height: 1.3;
  }

  h1 {
    ${h1Styles}
  }

  h2 {
    ${h2Styles}
  }

  h3 {
    ${h3Styles}
  }

  h4 {
    ${h4Styles}
  }

  h5 {
    ${h5Styles}
  }

  h6 {
    font-size: 1rem;
  }
`;

export default Typography;
