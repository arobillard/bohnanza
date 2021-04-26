import styled, { css } from "styled-components";
import { applyUserColor } from "../../styles/Theme";
import { UserTitle } from "../../styles/Typography";
import CardBack from "../cards/CardBack";

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
    bottom: ${({ theme }) => theme.spacers.twoThirds}rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: ${({ theme }) => theme.fonts.secondary};
    ${({ theme }) => theme.fontSizes.scale2}
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid;
    ${({userColor}) => applyUserColor(userColor, 'border-color')}
    transition:
      background-color ${({ theme }) => theme.transition},
      bottom ${({ theme }) => theme.transition},
      transform ${({ theme }) => theme.transition},
      color ${({ theme }) => theme.transition};
    ${({ noScore }) => {
      if (noScore) {
        return css`
          ${({userColor}) => applyUserColor(userColor, 'color')}
          bottom: 50%;
          transform: translate(-50%, 50%);
        `;
      } else {
        return css`
          ${({userColor}) => applyUserColor(userColor)}
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

export default function UserScore({ score, userColor }) {
  return (
    <UserScoreStyles
      noScore={score?.length === 0}
      userColor={userColor}
    >
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