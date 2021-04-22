import React from 'react';
import styled from 'styled-components';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import SendIcon from '@material-ui/icons/Send';
import Input from '../../forms/Input';

const MessageTypeBarStyles = styled.form`
  position: relative;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    padding: 0;
    background: transparent;
    border: 0;
  }
  .trade-btn {
    left: 0.5rem;
  }
  .send-btn {
    right: 0.5rem;
  }
`;

export default function MessageTypeBar({
  thisUser,
  setMessages,
  messages,
  setShowMakeTrade,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (e.currentTarget['message-bar'].value !== '') {
      const newMessage = {
        user: thisUser.id,
        message: e.currentTarget['message-bar'].value,
        type: 'message',
      };

      setMessages([...messages, newMessage]);
    }

    e.currentTarget['message-bar'].value = '';
  }

  function handleNewTrade() {
    setShowMakeTrade(true);
  }

  return (
    <MessageTypeBarStyles onSubmit={handleSubmit}>
      <Input
        name="message-bar"
        placeholder="Make a trade or type a message..."
        padding=".75rem 3rem"
      />
      <button className="trade-btn" type="button" onClick={handleNewTrade}>
        <AutorenewIcon />
      </button>
      <button className="send-btn" type="submit">
        <SendIcon />
      </button>
    </MessageTypeBarStyles>
  );
}
