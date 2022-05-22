import styled from 'styled-components';
import { ArtPiece } from '../api';

const GalleryItemWrapper = styled.article.attrs({
  className: 'text-white relative', // NOTE: We do not want text-color to change regardless of theme
})`
  height: fit-content;

  ::before {
    content: '';
    // NOTE: Hardcoded because this is one-off situation
    // plus even in dark-mode we would want this overlay effect
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.0001) 0%,
      rgba(0, 0, 0, 0.841672) 100%
    );
    width: 100%;
    position: absolute;
    z-index: 2;
    inset: 0;
  }
`;

interface GalleryArtProps {
  galleryArtData: ArtPiece;
}

export default function GalleryArt({ galleryArtData }: GalleryArtProps): JSX.Element {
  return (
    <GalleryItemWrapper>
      <img
        className='max-w-full relative'
        alt={galleryArtData.artName}
        src={galleryArtData.previewImagePath}
      />
      <div className='flex flex-col justify-end p-8 absolute z-10 h-fit bottom-0'>
        <h4 className='text-heading2'>{galleryArtData.artName}</h4>
        <h6 className='text-subhead2 opacity-75 mt-[7px]'>{galleryArtData.artistName}</h6>
      </div>
    </GalleryItemWrapper>
  );
}
