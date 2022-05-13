import styled from 'styled-components';

import { ReactComponent as RightMediaBtnSvg } from '../assets/icon-next-button.svg';
import { ReactComponent as LeftMediaBtnSvg } from '../assets/icon-back-button.svg';

const MediaButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: opacity 300ms ease;
  max-width: 76px;

  button {
    background-color: transparent;
    border: none;
  }

  button:hover,
  button.disabled {
    transition-duration: 150ms;
    opacity: 0.5;
  }

  button.disabled {
    opacity: 0.15;
  }
`;

export default function MediaButtons() {
  return (
    <MediaButtonWrapper className='h-4'>
      <button type='button' className='media-button-left'>
        <LeftMediaBtnSvg />
      </button>

      <button type='button' className='media-button-right'>
        <RightMediaBtnSvg />
      </button>
    </MediaButtonWrapper>
  );
}
