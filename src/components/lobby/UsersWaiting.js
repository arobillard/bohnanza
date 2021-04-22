import { removeUserFromGame, setHost } from "../../utils/users";
import styled, { css } from "styled-components";
import { applyUserColor } from "../../styles/Theme";
import { randomTilt } from "../../utils/helpers";

const UserGrid = styled.div`
  display: grid;
  grid-template-areas:
    'one two'
    'three four'
    'five six'
    'seven eight';
  gap: ${({ theme }) => theme.spacers.half}rem;
  @media ${({ theme }) => theme.mq.m} {
    grid-template-areas:
      'one two three'
      'four . five'
      'six seven eight';
  }
  @media ${({ theme }) => theme.mq.ml} {
    grid-template-areas:
    'one two'
    'three four'
    'five six'
    'seven eight';
  }
  @media ${({ theme }) => theme.mq.xl} {
    grid-template-areas:
      'one two three'
      'four . five'
      'six seven eight';
  }
`;

const UserGridItem = styled.div`
  padding-top: 100%;
  position: relative;
  ${({ theme }) => theme.radius}
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadow};
  &::before {
    content: ' ';
    position: absolute;
    top: ${({ theme }) => theme.spacers.third}rem;
    left: ${({ theme }) => theme.spacers.third}rem;
    width: calc(100% - ${({ theme }) => theme.spacers.twoThirds}rem);
    height: calc(100% - ${({ theme }) => theme.spacers.twoThirds}rem);
    border: 3px solid ${({ theme }) => theme.colors.primary};
  }
  &:first-child {
    grid-area: one;
    transform: rotate(${randomTilt(2)});
  }
  &:nth-child(2) {
    grid-area: two;
    transform: rotate(${randomTilt(2)});
  }
  &:nth-child(3) {
    grid-area: three;
    transform: rotate(${randomTilt(2)});
  }
  &:nth-child(4) {
    grid-area: four;
    transform: rotate(${randomTilt(2)});
  }
  &:nth-child(5) {
    grid-area: five;
    transform: rotate(${randomTilt(2)});
  }
  &:nth-child(6) {
    grid-area: six;
    transform: rotate(${randomTilt(2)});
  }
  &:nth-child(7) {
    grid-area: seven;
    transform: rotate(${randomTilt(2)});
  }
  &:nth-child(8) {
    grid-area: eight;
    transform: rotate(${randomTilt(2)});
  }
  .user-color {
    ${({ color }) => applyUserColor(color)}
    ${({ color }) => {
      if (color === 'yellow') {
        return css`
          border: 3px solid ${({ theme }) => theme.colors.primary};
        `;
      }
    }}
    display: inline-block;
    top: ${({ theme }) => theme.spacers.x1}rem;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    box-shadow: ${({ theme }) => theme.shadow};
  }
  .user-name {
    position: absolute;
    bottom: ${({ theme }) => theme.spacers.x2}rem;
    margin: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    text-align: center;
    width: calc(100% - ${({ theme }) => theme.spacers.x1}rem);
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: bold;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.primary};
    ${({ theme }) => theme.fontSizes.scale4}
    text-shadow: ${({ theme }) => theme.shadow};
  }
  .remove-user {
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: 0;
    padding: ${({ theme }) => theme.spacers.half}rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  .host-badge {
    position: absolute;
    top: ${({ theme }) => theme.spacers.third}rem;
    left: ${({ theme }) => theme.spacers.third}rem;
    display: inline-block;
    padding: ${({ theme }) => theme.spacers.quarter}rem ${({ theme }) => theme.spacers.third}rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    border-radius: 0 0 .5rem 0;
  }
`;

const UserGridPH = styled.div`
  padding-top: 100%;
  position: relative;
  ${({ theme }) => theme.radius}
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadow};
  opacity: .5;
  &:first-child {
    grid-area: one;
  }
  &:nth-child(2) {
    grid-area: two;
  }
  &:nth-child(3) {
    grid-area: three;
  }
  &:nth-child(4) {
    grid-area: four;
  }
  &:nth-child(5) {
    grid-area: five;
  }
  &:nth-child(6) {
    grid-area: six;
  }
  &:nth-child(7) {
    grid-area: seven;
  }
  &:nth-child(8) {
    grid-area: eight;
  }
  .user-color {
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 3px solid ${({ theme }) => theme.colors.primary};
    display: inline-block;
    top: ${({ theme }) => theme.spacers.x1}rem;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    /* box-shadow: ${({ theme }) => theme.shadow}; */
  }
  .user-name {
    position: absolute;
    bottom: ${({ theme }) => theme.spacers.x2}rem;
    margin: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    text-align: center;
    width: calc(100% - ${({ theme }) => theme.spacers.x1}rem);
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: bold;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.primary};
    ${({ theme }) => theme.fontSizes.scale4}
    text-shadow: ${({ theme }) => theme.shadow};
  }
`;

export default function UsersWaiting({ gameCode, gameData, user, setUser, users }) {

  function userPlaceholders() {
    const addAmount = 8 - users.length
    const blanks = [];
    let i = 0;

    while (i < addAmount) {

      blanks.push(
        <UserGridPH key={`user-grid-ph-${i + 1}`}>
          <span className="user-color"></span>
          <p className="user-name">---</p>
        </UserGridPH>
      )

      i++;
    }
    return blanks;
  }

  function handleRemoveUser(user) {

    const updatedUser = {
      userName: user.name,
      id: user.userId,
      gameCode: null
    }
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(null);
    removeUserFromGame(gameCode, user.userId);

    if (user.userId === gameData.host) {
      let reassigned = false;
      users.forEach(gUser => {
        if (gUser.userId !== user.userId && !reassigned) {
          setHost(gameCode, gUser.userId);
          reassigned = true;
        }
      })
    }
  }

  return (
    <UserGrid>
      {users.map(gameUser => (
        <UserGridItem key={gameUser.userId} color={gameUser.bohnanza.color}>
          <span className="user-color"></span>
          <p className="user-name">{gameUser.name}</p>
          {
            gameUser.userId === user.id
            &&
            <button className="remove-user material-icons" onClick={() => handleRemoveUser(gameUser)}>
              close
            </button>
          }
          {
            gameData?.host === gameUser.userId
            &&
            <span className="host-badge">Host</span>
          }
        </UserGridItem>
      ))}
      {userPlaceholders()}
    </UserGrid>
  )
}