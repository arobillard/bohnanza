import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/forms/Input';
import { InputButtonWrap } from '../styles/modules/Forms';
import { generateGameCode, slugify } from '../utils/helpers';

const FormGameCode = styled.form`
  padding: ${({ theme }) => theme.spacers.x2}rem;
  width: min(40em, 100%);
  background-color: #ccc;
  ${({ theme }) => theme.radius}
`;

export default function Join({ gameCode, setGameCode }) {
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const gCode = e.currentTarget.gameCode.value;
    history.push(`/${slugify(gCode)}`);
  }

  function handleChange(e) {
    setGameCode(e.currentTarget.value);
  }

  return (
    <FormGameCode onSubmit={handleSubmit}>
      <h2>Join or host a game!</h2>
      <p>
        To start a new game, simply enter a new unique Gamecode in the form
        below and hit Start Playing! If you wish to join a game someone else
        created, enter their Gamecode and hit Start Playing!
      </p>
      <InputButtonWrap>
        <Input
          type="text"
          name="gameCode"
          required
          placeholder="Enter Gamecode"
          defaultValue={gameCode}
          onChange={handleChange}
        />
        <Button>Start Playing!</Button>
      </InputButtonWrap>
    </FormGameCode>
  );
}
