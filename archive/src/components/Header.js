import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../styles/modules/Layout';

const Masthead = styled.header`
  background-color: #ccc;
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  height: 4.5rem;
  display: flex;
  align-items: center; */
`;

const GameCode = styled.strong`
  display: block;
  ${({ theme }) => theme.fontSizes.scale3}
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  h1 {
    margin: 0;
    ${({ theme }) => theme.fontSizes.scale2}
  }
`;

export default function Header({ gameCode }) {
  return (
    <Masthead>
      <Container flex>
        <Logo to="/">
          <h1>Bohnanza</h1>
        </Logo>
        {gameCode && <GameCode>{gameCode}</GameCode>}
      </Container>
    </Masthead>
  );
}

Header.propTypes = {
  gameCode: PropTypes.string,
};
