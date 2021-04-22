import React, { useState } from 'react';
import styled from 'styled-components';
import MakeTrade from './message/MakeTrade';
import MessageDisplay from './message/MessageDisplay';
import MessageTypeBar from './message/MessageTypeBar';

const MessageBoardStyle = styled.div`
  grid-area: message;
  background-color: #ccc;
  ${({ theme }) => theme.radius}
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  z-index: 200;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: ${({ theme }) => theme.spacers.twoThirds}rem;
  .type-bar {
    padding: ${({ theme }) => theme.spacers.half}rem;
    background-color: #eee;
    ${({ theme }) => theme.radius};
  }
`;

export default function MessageBoard({
  messages,
  setMessages,
  trades,
  setTrades,
  thisUser,
  users,
  setUsers,
}) {
  const [showMakeTrade, setShowMakeTrade] = useState(false);

  return (
    <MessageBoardStyle>
      <MessageDisplay
        messages={messages}
        trades={trades}
        setTrades={setTrades}
        thisUser={thisUser}
        users={users}
        setUsers={setUsers}
      />
      <MessageTypeBar
        thisUser={thisUser}
        messages={messages}
        setMessages={setMessages}
        setShowMakeTrade={setShowMakeTrade}
      />
      {showMakeTrade && (
        <MakeTrade
          setShowMakeTrade={setShowMakeTrade}
          thisUser={thisUser}
          setTrades={setTrades}
        />
      )}
    </MessageBoardStyle>
  );
}
