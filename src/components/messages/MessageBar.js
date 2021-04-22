import styled from "styled-components";
import { setNewMessage } from "../../utils/database";
import Input from "../forms/Input";

const MessageTypeBarStyles = styled.form`
  position: relative;
  margin: ${({ theme }) => theme.spacers.twoThirds}rem;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    padding: 0;
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
  .trade-btn {
    left: 0.5rem;
  }
  .send-btn {
    right: 0.5rem;
  }
`;

export default function MessageBar({
  gameData,
  gameCode,
  userData,
  users,
  errors,
  setErrors,
  setTradeBoardVisible
}) {

  function handleSubmit(e) {
    e.preventDefault();

    if (e.currentTarget['message-bar'].value !== '') {
      const newMessage = {
        userId: userData.userId,
        message: e.currentTarget['message-bar'].value,
        type: 'message',
      };

      setNewMessage(newMessage, gameCode);
    }

    e.currentTarget['message-bar'].value = '';
  }

  return (
    <MessageTypeBarStyles onSubmit={handleSubmit}>
      <Input
        name="message-bar"
        placeholder="Make a trade or type a message..."
        padding=".75rem 3rem"
      />
      <button className="trade-btn" type="button" onClick={() => gameData.turnPhase.phase === 2 && setTradeBoardVisible(true)}>
        <span className="material-icons">autorenew</span>
      </button>
      <button className="send-btn" type="submit">
        <span className="material-icons">send</span>
      </button>
    </MessageTypeBarStyles>
  )
}