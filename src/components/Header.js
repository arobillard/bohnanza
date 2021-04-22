import { Link } from "react-router-dom";
import styled from "styled-components"
import { Container } from "../styles/modules/Layout";

const Masthead = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacers.third}rem;
  .trim {
    padding: ${({ theme }) => theme.spacers.third}rem;
    border: 3px solid ${({ theme }) => theme.colors.primary};
  }
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: ${({theme}) => theme.colors.primary};
  h1 {
    margin: 0;
    ${({ theme }) => theme.fontSizes.scale2}
  }
`;

const Tagline = styled.p`
  margin: 0 0 0 1.5rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
  ${({ theme }) => theme.fontSizes.scale5};
  font-weight: bold;
  padding-bottom: .3rem;
  display: none;
  @media ${({ theme }) => theme.mq.ml} {
    display: block;
  }
`;

const GameCode = styled.strong`
  display: none;
  ${({ theme }) => theme.fontSizes.scale4}
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.primary};
  align-self: center;
  @media ${({ theme }) => theme.mq.m} {
    display: block;
  }
`;

export default function Header({ gameCode }) {

  return (
    <Masthead>
      <div className="trim">
        <Container flex vAlign="flex-end">
          <LogoWrap>
            <Logo to="/">
              <h1>Bohnanza</h1>
            </Logo>
            <Tagline>"To Bean or not to Bean!"</Tagline>
          </LogoWrap>
          <GameCode>
            {gameCode}
          </GameCode>
        </Container>
        </div>
    </Masthead>
  )
}