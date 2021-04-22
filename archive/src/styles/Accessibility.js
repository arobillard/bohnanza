import { createGlobalStyle } from 'styled-components';

const Accessibility = createGlobalStyle`

  .screen-reader-text {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

`;

export default Accessibility;
