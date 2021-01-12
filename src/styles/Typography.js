import { createGlobalStyle } from 'styled-components';

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

const scales = [
  { size: 0, scale: 1.2 },
  { size: 38, scale: 1.333 },
];

function breakpointGenerateScales(typeScales, step) {
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

const fontSecondary = `font-family: "Playfair", serif;`;

const h1Styles = `
  ${fontSecondary}
  ${breakpointGenerateScales(scales, 5)}
  font-weight: 900;
  text-shadow: 2px 2px 0 #0004;
`;

const h2Styles = `
  ${breakpointGenerateScales(scales, 4)}
`;

const h3Styles = `
  ${breakpointGenerateScales(scales, 3)}
`;

const h4Styles = `
  ${breakpointGenerateScales(scales, 2)}
`;

const h5Styles = `
  ${breakpointGenerateScales(scales, 1)}
`;

const Typography = createGlobalStyle`

  html {
    font-size: 1rem;
    line-height: 1.5;
    font-family: "Lato", sans-serif;
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
