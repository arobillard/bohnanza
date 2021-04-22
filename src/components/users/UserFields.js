import styled, { css } from "styled-components";
import UserField from "./UserField";
import UserScore from "./UserScore";

const UserFieldsStyles = styled.div`
  grid-area: userFields;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacers.half}rem;
  align-items: flex-start;
  ${({ inUserBoard }) =>
    inUserBoard &&
    css`
      grid-template-columns: repeat(2, 1fr);
      @media ${({ theme }) => theme.mq.sm} {
        grid-template-columns: repeat(4, 1fr);
      }
    `}
`;

export default function UserFields({
  userData,
  inUserBoard,
  handleHarvest
}) {
  return (
    <UserFieldsStyles inUserBoard={inUserBoard}>
      {userData && Object.keys(userData.bohnanza.fields).sort().map((field, i) => (
        <UserField
          key={`${userData.userId}-field-${i + 1}`}
          field={userData.bohnanza.fields[field]}
          fieldNum={i + 1}
          userData={userData}
          inUserBoard={inUserBoard}
          handleHarvest={handleHarvest}
        />
      ))}
      {
        inUserBoard
        ?
        <UserScore
          score={userData.bohnanza.score}
        />
        :
        null
      }
    </UserFieldsStyles>
  )
}