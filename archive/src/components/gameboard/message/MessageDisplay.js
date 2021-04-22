import React from 'react';
import styled, { css } from 'styled-components';
import TradeCard from './TradeCard';

const MessageDisplayStyles = styled.div`
  /* overflow: hidden; */
  overflow-y: scroll;
  /* height: 100%; */
  .message-display-inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacers.half}rem;
  }
`;

const Message = styled.div`
  grid-column: span 3;
  padding: ${({ theme }) => theme.spacers.half}rem;
  ${({ theme }) => theme.radius};
  background-color: #bbb;
  ${({ yourMessage }) =>
    yourMessage &&
    css`
      grid-column: 2 / span 3;
      background-color: #666;
      color: #fff;
    `}
`;

export default function MessageDisplay({
  users,
  setUsers,
  messages,
  trades,
  setTrades,
  thisUser,
}) {
  return (
    <MessageDisplayStyles>
      <div className="message-display-inner">
        {messages.map((message, i) => {
          const yourMessage = message.user === thisUser.id;
          const userName = yourMessage ? 'You' : users[message.user].name;
          if (message.type === 'message') {
            return (
              <Message key={`message-board-${i}`} yourMessage={yourMessage}>
                <strong>{userName}:</strong> {message.message}
              </Message>
            );
          }
          return (
            <TradeCard
              key={`message-board-${i}`}
              trade={trades[message.tradeRef]}
              tradeRef={message.tradeRef}
              trades={trades}
              setTrades={setTrades}
              yourMessage={yourMessage}
              users={users}
              setUsers={setUsers}
              thisUser={thisUser}
            />
          );
        })}
      </div>
    </MessageDisplayStyles>
  );
}
