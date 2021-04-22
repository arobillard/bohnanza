import { useEffect } from "react";
import { InputButtonWrap } from "../../styles/modules/Forms";
import { FloatingCard } from "../../styles/modules/Layout";
import { addUserToGame, newUserCredentials } from "../../utils/users";
import Button from "../Button";
import Input from "../forms/Input";
import ColorPicker from './ColorPicker';

export default function UserJoin({ 
  gameCode,
  gameData,
  setUser,
  username,
  setUsername,
  users,
  errors,
  setErrors,
  savedUser
}) {

  

  useEffect(() => {
    setUsername(savedUser?.userName);
  }, [setUsername, savedUser?.userName])

  function handleSubmit(e) {
    e.preventDefault();
    const newUserName = e.currentTarget.userName.value;
    const color = e.currentTarget.colorPicker.value;

    if (newUserName === savedUser?.userName && color) {
      savedUser['gameCode'] = gameCode;
      setUser(savedUser);
      addUserToGame(gameCode, gameData, savedUser, color);
      localStorage.setItem('user', JSON.stringify(savedUser));
    } else if (newUserName && color) {
      const newUser = {
        ...newUserCredentials(newUserName),
        gameCode
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      addUserToGame(gameCode, gameData, newUser, color);
    } 
    if (!color) {
      const updatedErrors = [...errors];
      updatedErrors.push({
        msg: 'You must pick a color!',
        type: 'warning'
      });
      setErrors(updatedErrors);
    }
    if (!newUserName) {
      const updatedErrors = [...errors];
      updatedErrors.push({
        msg: 'You must supply a username!',
        type: 'warning'
      });
      setErrors(updatedErrors);
    }

  }

  function handleUserName(e) {
    setUsername(e.currentTarget.Value);
  }

  return (
    <FloatingCard>
      <form className="trim" onSubmit={handleSubmit}>
        <h2>Enter your name and pick a color!</h2>
        <ColorPicker
          users={users}
        />
        <InputButtonWrap>
          <Input
            name="userName"
            onChange={handleUserName}
            value={username}
            placeholder="Username"
            labelText="Username"
            labelHide
            required
          />
          <Button>Join</Button>
        </InputButtonWrap>
      </form>
    </FloatingCard>
  )
}