import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.container}
  ${({ noGutter }) =>
    !noGutter &&
    css`
      padding-left: ${({ theme }) => theme.spacers.x1}rem;
      padding-right: ${({ theme }) => theme.spacers.x1}rem;
    `}
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      align-items: ${({ vAlign }) => vAlign || 'center'};
      justify-content: ${({ hAlign }) => hAlign || 'space-between'};
    `}
  ${({ grid }) =>
    grid &&
    css`
      display: grid;
      align-items: ${({ vAlign }) => vAlign || 'stretch'};
      justify-content: ${({ hAlign }) => hAlign || 'stretch'};
      ${({ gap }) =>
        gap &&
        css`
          gap: ${gap};
        `};
      ${({ cols }) =>
        Object.keys(cols).map((size) => {
          if (size === 'xs') {
            return css`
              grid-template-columns: repeat(${cols[size]}, 1fr);
            `;
          }
          return css`
            @media ${({ theme }) => theme.mq[size]} {
              grid-template-columns: repeat(${cols[size]}, 1fr);
            }
          `;
        })}
    `}
`;
