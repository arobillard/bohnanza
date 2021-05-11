import styled from 'styled-components';

const GameOptionsStyles = styled.div`
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  margin-bottom: ${({ theme }) => theme.spacers.x1}rem;
  background-color: ${({ theme }) => theme.colors.secondaryPale};
  ${({ theme }) => theme.radius}
  box-shadow: ${({ theme }) => theme.shadow};
  h2 {
    ${({ theme }) => theme.fontSizes.scale4}
  }
`;

export default function GameOptions({
  gameData
}) {
  return (
    <GameOptionsStyles>
      <h2>Game Options</h2>
    </GameOptionsStyles>
  )
}