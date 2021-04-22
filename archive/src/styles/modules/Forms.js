import styled from 'styled-components';

export const InputButtonWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacers.x1}rem;
  @media ${({ theme }) => theme.mq.s} {
    grid-template-columns: 2fr 1fr;
  }
`;
