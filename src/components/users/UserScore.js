import styled, { css } from "styled-components";
import { UserTitle } from "../../styles/Typography";
import CardBack from "../CardBack";

const UserScoreStyles = styled.div`
  /* grid-area: userScore; */
  .score-cards-wrap {
    position: relative;
    /* padding-top: ${({ theme }) => theme.cardRatio.v}; */
    /* padding-top: 8rem; */
    /* > div:not(.score-number) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(90deg);
    } */
    .card-ph {
      padding-top: ${({ theme }) => theme.cardRatio.v};
    }
  }
  .score-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: ${({ theme }) => theme.fonts.secondary};
    ${({ theme }) => theme.fontSizes.scale2}
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid ${({ theme }) => theme.colors.primary};
    ${({ noScore }) => {
      if (noScore) {
        return css`
          color: ${({ theme }) => theme.colors.primary};
        `;
      } else {
        return css`
          background-color: ${({ theme }) => theme.colors.primary};
          color: #fff;
        `;
      }
    }}
    border-radius: 50%;
    span {
      margin-top: -.75rem;
    }
  }
`;

export default function UserScore({ score }) {
  return (
    <UserScoreStyles noScore={score?.length === 0}>
      <UserTitle textAlign="center">Your Score</UserTitle>
      <div className="score-cards-wrap">
        {
          score.length
          ?
          <CardBack
            // width={{
            //   xs: '6rem',
            //   m: '8rem',
            // }}
            // rotate="true"
          />
          :
          <div className="card-ph"></div>
        }
        <div className="score-number">
          <span>{score.length}</span>
        </div>
      </div>
    </UserScoreStyles>
  )
}