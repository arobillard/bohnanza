import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GameBoard from './GameBoard';
import Footer from './components/Footer';
import Header from './components/Header';
import Join from './pages/Join';
import Styles from './styles/Styles';
import Theme from './styles/Theme';
import Errors from './components/Errors';

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  /* padding-top: 4.5rem; */
`;

const Main = styled.main.attrs(() => ({
  id: 'main',
  role: 'main',
}))`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BPDisplay = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: #333;
  color: #fff;
  ${({ theme }) => theme.radius};
  padding: 0.5rem 1rem;
  z-index: 1000000;
  &::before {
    content: 'XS';
    @media ${({ theme }) => theme.mq.s} {
      content: 'S';
    }
    @media ${({ theme }) => theme.mq.m} {
      content: 'M';
    }
    @media ${({ theme }) => theme.mq.ml} {
      content: 'ML';
    }
    @media ${({ theme }) => theme.mq.l} {
      content: 'L';
    }
    @media ${({ theme }) => theme.mq.xl} {
      content: 'XL';
    }
    @media ${({ theme }) => theme.mq.xxl} {
      content: 'XXL';
    }
  }
`;

export default function Router() {

  const [gameCode, setGameCode] = useState('');
  const [errors, setErrors] = useState([]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <Styles />
        <PageLayout>
          <Header gameCode={gameCode}/>
          <Main>
            <Errors errors={errors} setErrors={setErrors} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Join gameCode={gameCode} setGameCode={setGameCode} />
                )} />
              <Route
                path="/:gameCode"
                render={({ match }) => (
                  <GameBoard
                    match={match}
                    gameCode={gameCode}
                    setGameCode={setGameCode}
                    setErrors={setErrors}
                    errors={errors}
                  />
                )}
              />
            </Switch>
          </Main>
          <Footer />
          <BPDisplay />
        </PageLayout>
      </ThemeProvider>
    </BrowserRouter>
  )
}