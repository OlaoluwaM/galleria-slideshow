import styled from 'styled-components';

import { ReactComponent as RightMediaBtnSvg } from '../assets/shared/icon-next-button.svg';
import { ReactComponent as LeftMediaBtnSvg } from '../assets/shared/icon-back-button.svg';

const MediaButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: opacity 300ms ease;
  max-width: 76px;
  cursor: pointer;

  div:hover,
  div.disabled {
    transition-duration: 150ms;
    opacity: 0.5;
  }

  div.disabled {
    opacity: 0.15;
  }
`;

export default function MediaButtons() {
  return (
    <MediaButtonWrapper className='h-4'>
      <div className='media-button-left'>
        <LeftMediaBtnSvg />
      </div>

      <div className='media-button-right'>
        <RightMediaBtnSvg />
      </div>
    </MediaButtonWrapper>
  );
}
