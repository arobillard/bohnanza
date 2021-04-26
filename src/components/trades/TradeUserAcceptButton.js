import styled from 'styled-components';
import { checkTrade, setConfirmedToUser, updateTradeUserStatus } from "../../utils/trades";
import { applyUserColor } from '../../styles/Theme';

const TradeUserAcceptButtonStyles = styled.div`
  ${({ color }) => applyUserColor(color)};
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  + div {
    margin-left: ${({ theme }) => theme.spacers.third}rem;
  }
`;

export default function TradeUserAcceptButton({
  tradeData,
  singleUser,
  userTrade,
  myTurn,
  myAccept
}) {

  function statusIcon() {
    if (userTrade.status === 'accept') {
      return <span className="material-icons">check</span>;
    } else if (userTrade.status === 'reject') {
      return <span className="material-icons">close</span>;
    } else {
      return <span>?</span>
    }
  }

  function handleStatus() {
    if (myAccept) {

      const canAccept = checkTrade(singleUser.bohnanza.hand, tradeData);

      if (canAccept && userTrade.status !== 'accept') {
        updateTradeUserStatus(tradeData.tradeId, userTrade, 'accept');
      } else {
        updateTradeUserStatus(tradeData.tradeId, userTrade, 'reject');
      }
    } else if (myTurn && userTrade.status === 'accept') {
      setConfirmedToUser(tradeData, userTrade.userId);
    }
  }

  return (
    <TradeUserAcceptButtonStyles
      color={singleUser.bohnanza.color}
      onClick={handleStatus}
    >
      {statusIcon()}
      <span className="screen-reader-text">{singleUser.name}</span>
    </TradeUserAcceptButtonStyles>
  )
}