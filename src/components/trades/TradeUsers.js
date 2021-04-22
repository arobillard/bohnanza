import styled from "styled-components"
import { ColorItem } from "../lobby/ColorPicker";

const TradeUsersStyles = styled.div`
  grid-area: users;
  padding: ${({ theme }) => theme.spacers.twoThirds}rem;
  .user-picker-wrap {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacers.third}rem;
    > div {
      justify-content: flex-start;
    }
  }
`;

export default function TradeUsers({
  users,
  userData,
  gameData,
  myTurn
}) {

  const turnPlayer = users.filter(u => u.userId === gameData?.turn)[0].name;

  return (
    <TradeUsersStyles>
      {
        myTurn
        ?
        <>
          <h3>Select Users</h3>
          <div className="user-picker-wrap">
            {users.map(user => (
              user.userId !== userData.userId
              ?
              <ColorItem
                key={`user-picker-${user.userId}`}
                color={user.bohnanza.color}
                size={3}
              >
                <input
                  type="checkbox"
                  name={`user-picker-${user.userId}`}
                  id={`user-picker-${user.userId}`}
                  value={user.userId}
                  defaultChecked={true}
                />
                <label htmlFor={`user-picker-${user.userId}`}>
                  <span className="screen-reader-text">Include {user.name} in trade offer</span>
                  {user.name[0]}
                </label>
              </ColorItem>
              :
              null
            ))}
          </div>
        </>
        :
        <>
          <h3>Trading with</h3>
          <p>{turnPlayer}</p>
        </>
      }
    </TradeUsersStyles>
  )
}