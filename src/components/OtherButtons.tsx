import styled from 'styled-components';

const BaseTextButtonComp = styled.button.attrs({
  type: 'button',
})`
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.gray[900]};
  background: transparent;
  display: inline-block;
  border: none;
  transition: color 300ms ease;

  &:hover {
    transition-duration: 150ms;
    color: ${({ theme }) => theme.color.fg};
  }
`;

export const SlideshowButton = styled(BaseTextButtonComp)``;

export const GoToSourceButton = styled(BaseTextButtonComp)`
  font-size: 0.5625rem;
  line-height: 11px;
  text-align: center;
  letter-spacing: 1.92857px;
  text-decoration-line: underline;
`;
