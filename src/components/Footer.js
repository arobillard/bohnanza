import styled from "styled-components"
import { Container } from "../styles/modules/Layout";

const FooterStyles = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondaryPale};
  padding: ${({ theme }) => theme.spacers.x1}rem 0;
  p {
    margin: 0;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

export default function Footer() {
  return (
    <FooterStyles>
      <Container flex vAlign="flex-end">
        <p>Bohnanza originally created by <a href="https://www.riograndegames.com/games/bohnanza/" target="_blank" rel="noreferrer noopener">Rio Grade Games</a></p>
        <p>Created for fun, not for gain, by <a href="https://adamrobillard.ca" target="_blank" rel="noreferrer noopener">Adam Robillard</a></p>
      </Container>
    </FooterStyles>
  )
}