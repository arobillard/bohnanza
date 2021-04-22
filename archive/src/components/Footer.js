import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/modules/Layout';

const PageFooter = styled.footer`
  background-color: #ccc;
`;

export default function Footer() {
  return (
    <PageFooter>
      <Container grid cols={{ xs: 1, m: 2, l: 4 }} gap="1rem">
        <div>
          <h2 style={{ margin: '0' }}>Bohnanza</h2>
          <p>
            Based on popular table top game{' '}
            <a href="https://www.riograndegames.com/games/bohnanza/">
              Bohnanza
            </a>{' '}
            by <a href="https://www.riograndegames.com/">Rio Grande Games</a>.
          </p>
        </div>
      </Container>
    </PageFooter>
  );
}
