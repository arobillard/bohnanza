import styled, { css } from "styled-components"
import { applyUserColor } from "../../styles/Theme";
import TradeDisplay from "../trades/TradeDisplay";

const MessageDisplayStyles = styled.div`
  /* overflow: hidden; */
  overflow-y: scroll;
  /* height: 100%; */
  margin: 0 ${({ theme }) => theme.spacers.twoThirds}rem;
  padding-top: ${({ theme }) => theme.spacers.twoThirds}rem;
  border-radius: 0 0 .75rem .75rem;
  .message-display-inner {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: ${({ theme }) => theme.spacers.half}rem;
  }
`;

const Message = styled.div`
  grid-column: span 9;
  padding: ${({ theme }) => theme.spacers.half}rem;
  ${({ theme }) => theme.radius};
  ${({ color }) => applyUserColor(color)}
  ${({ color }) => {
      if (color !== 'yellow') {
        return css`
          color: #fff;
        `;
      }
    }}
  ${({ myMessage }) => myMessage && css`
    grid-column: 4 / span 9;
  `}
  @media ${({ theme }) => theme.mq.l} {
    grid-column: span 8;
    ${({ myMessage }) => myMessage && css`
      grid-column: 5 / span 8;
    `}
  }
`;

export default function MessageDisplay({
  gameData,
  gameCode,
  userData,
  users,
  errors,
  setErrors,
  trades
}) {


  return (
    <MessageDisplayStyles
      ref={el => {
        if (!el) return;

        el.scrollTop = el.firstElementChild.offsetHeight;
      }}
    >
      <div className="message-display-inner">
        {gameData?.messages?.map((message, index) => (
          message.type === 'message'
          ?
          <Message
            key={`mb-message-${index}`}
            myMessage={message.userId === userData.userId}
            color={users.filter(u => u.userId === message.userId)[0].bohnanza.color}
          >
            <strong>
              {
                message.userId === userData.userId
                ?
                'You'
                :
                users.filter(u => u.userId === message.userId)[0].name
              }:
            </strong> {message.message}
          </Message>
          :
          <TradeDisplay
            key={`mb-trade-${message.tradeId}`}
            tradeId={message.tradeId}
            tradeData={trades.filter(t => t.tradeId === message.tradeId)[0]}
            gameData={gameData}
            users={users}
            userData={userData}
            gameCode={gameCode}
          />
        ))}
      </div>
    </MessageDisplayStyles>
  )
}