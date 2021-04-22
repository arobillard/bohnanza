import styled, { css } from "styled-components"
import { UserTitle } from "../../styles/Typography";
import { buyField } from "../../utils/users";
import Button from "../Button";

const EmptyFieldStyles = styled.div`
  position: relative;
  .card-embed {
    padding-top: ${({ theme, rotate }) => (rotate ? theme.cardRatio.h : theme.cardRatio.v)};
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    ${({ theme }) => theme.radius};
    ${({ active }) => !active && css`
      opacity: .5;
    `};
    p {
      position: absolute;
      font-family: ${({ theme }) => theme.fonts.secondary};
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
      display: inline-block;
      width: calc(100% - ${({ theme }) => theme.spacers.x1}rem);
    }
  }
  button {
    position: absolute;
    bottom: ${({ theme }) => theme.spacers.half}rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default function EmptyField({
  fieldNum,
  active,
  inUserBoard,
  userData
}) {

  function handleActivate() {
    if (userData.bohnanza.score.length >= 3) {
      buyField(userData);
    } else {
      console.log('not enough points');
    }
  }

  return (
    <EmptyFieldStyles active={active}>
      {
        inUserBoard
        ?
        <>
          <UserTitle>Field {fieldNum}</UserTitle>
          <div className="card-embed">
          </div>
        </>
        :
        <div className="card-embed">
          <p>Field {fieldNum}</p>
        </div>
      }
      {
        !active && inUserBoard
        &&
        <Button onClick={handleActivate} disabled={userData.bohnanza.score.length < 3}>Activate</Button>
      }
    </EmptyFieldStyles>
  )
}