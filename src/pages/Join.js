import Input from '../components/forms/Input';
import { InputButtonWrap } from '../styles/modules/Forms';
import Button from "../components/Button";
import { useHistory } from "react-router";
import { slugify, wordGameCode } from "../utils/helpers";
import { useEffect } from "react";
import { FloatingCard } from '../styles/modules/Layout';

export default function Join({ gameCode, setGameCode }) {

  const history = useHistory();

  useEffect(() => {
    if (!gameCode) {
      setGameCode(wordGameCode());
    }
  }, [setGameCode, gameCode])

  function handleSubmit(e) {
    e.preventDefault();
    const gCode = e.currentTarget.gameCode.value;
    history.push(`/${slugify(gCode)}`);
  }

  function handleChange(e) {
    setGameCode(e.currentTarget.value);
  }

  return (
    <FloatingCard>
      <form className="trim" onSubmit={handleSubmit}>
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
            value={gameCode}
            onChange={handleChange}
            labelText="Enter Gamecode"
            labelHide
          />
          <Button>Start Playing!</Button>
        </InputButtonWrap>
      </form>
    </FloatingCard>
  )
}