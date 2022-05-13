import styled from 'styled-components';

import { SlideshowButton } from './OtherButtons';
import { ReactComponent as LogoSvg } from '../assets/logo.svg';

const HeaderWrapper = styled.header.attrs({
  className: 'w-screen h-[4.9375rem] pt-1 px-6 flex justify-between items-center',
})`
  border-bottom: 2px solid ${({ theme }) => theme.color.gray[100]};
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo />
      <SlideshowButton className='text-link2 text-right'>start slideshow</SlideshowButton>
    </HeaderWrapper>
  );
}

function Logo() {
  return (
    <div className='logo w-max h-max flex items-end justify-start'>
      <LogoSvg className='w-36' />
    </div>
  );
}
