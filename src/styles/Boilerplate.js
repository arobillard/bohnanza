import { createGlobalStyle } from 'styled-components';

const Boilerplate = createGlobalStyle`

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }

  audio,
  canvas,
  progress,
  video {
    display: inline-block;
    vertical-align: baseline;
  }

  template {
    display: none;
  }

  details {
    cursor: pointer;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  a,
  area,
  button,
  input,
  label,
  select,
  textarea,
  [tabindex] {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }

  img {
    border: 0;
  }

  .img-flex,
  .img-flex img {
    display: block;
    width: 100%;
  }

  svg {
    fill: currentColor;
    width: 100%;
    display: block;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  svg.img-flex {
    width: 100%;
    height: 100%;
  }

  .push-l-auto {
    margin-left: auto;
  }

`;

export default Boilerplate;
