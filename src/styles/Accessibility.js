import { createGlobalStyle } from 'styled-components';

const Accessibility = createGlobalStyle`

  *:focus {
    outline: 0;
  }

  .screen-reader-text {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  button {
    cursor: pointer;
  }

`;

export default Accessibility;
