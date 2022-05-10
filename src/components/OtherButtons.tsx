import styled from 'styled-components';

const BaseTextButton = styled.button.attrs({
  type: 'button',
})`
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.color.gray[100]};
  background: transparent;
  display: inline-block;
  border: none;
  transition: color 300ms ease;
  text-align: center;

  &:hover {
    transition-duration: 150ms;
    color: ${({ theme }) => theme.color.bg};
  }
`;

export const SlideshowButton = styled(BaseTextButton).attrs({
  className: 'text-xs',
})`
  letter-spacing: 2.57143px;
`;

export const GoToSourceButton = styled(BaseTextButton)`
  font-size: 0.5625rem;
  line-height: 11px;
  text-align: center;
  letter-spacing: 1.92857px;
  text-decoration-line: underline;
`;
