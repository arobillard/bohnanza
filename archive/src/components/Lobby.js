import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { Container } from '../styles/modules/Layout';
import ColorPicker from './join/ColorPicker';
import Input from './forms/Input';
import { InputButtonWrap } from '../styles/modules/Forms';
import { createNewUser } from '../utils/users';

const LobbyStyles = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  width: 100%;
  .game-info {
    text-align: center;
  }
  p {
    margin: 0;
  }
  @media ${({ theme }) => theme.mq.l} {
    grid-template-columns: 1fr 1fr;
  }
`;

const JoinForm = styled.form`
  padding: ${({ theme }) => theme.spacers.x2}rem;
  ${({ theme }) => theme.radius}
  border: 2px solid #ccc;
`;

export default function Lobby({
  users,
  setUsers,
  thisUser,
  setThisUser,
  gameCode,
}) {
  const [userName, setUserName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.currentTarget.userName.value;
    const color = e.currentTarget.colorPicker.value;
    if (name && color) {
      const newUser = createNewUser(name, color);
      setThisUser(newUser);
      localStorage.setItem('thisUser', JSON.stringify(newUser));
    }
  }

  function handleUserName(e) {
    setUserName(e.currentTarget.value);
  }

  return (
    <Container>
      <LobbyStyles>
        <div className="game-info">
          <p>Gamecode</p>
          <h2>{gameCode}</h2>
          <Button>Start game!</Button>
        </div>
        {!thisUser.name && (
          <JoinForm className="join-form" onSubmit={handleSubmit}>
            <h2>Enter your name and pick a color!</h2>
            <ColorPicker users={users} />
            <InputButtonWrap>
              <Input
                name="userName"
                onChange={handleUserName}
                value={userName}
                required
              />
              <Button>Join</Button>
            </InputButtonWrap>
          </JoinForm>
        )}
        {thisUser.name && (
          <div className="user-displays">
            <p>Users!</p>
          </div>
        )}
      </LobbyStyles>
    </Container>
  );
}
