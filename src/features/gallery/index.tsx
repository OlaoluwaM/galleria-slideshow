import Masonry from '../../components/MasonryGrid';
import GalleryArt from './components/GalleryArt';

import { useState } from 'react';
import { getAllGalleryArt } from './api';

export default function Gallery() {
  const [allGalleryArtData] = useState(getAllGalleryArt);

  const commonMasonryClassNames = 'flex gap-6';

  const masonryClassNames = {
    wrapper: commonMasonryClassNames,
    columns: `${commonMasonryClassNames} flex-col`,
  };

  const galleryBreakpointColMap = { default: 4, 1440: 4, 1000: 3, 768: 2, 570: 1 };

  return (
    <section className='p-6'>
      <Masonry
        customClassNames={masonryClassNames}
        breakpointColMap={galleryBreakpointColMap}>
        {allGalleryArtData.map(galleryArtData => (
          <GalleryArt key={galleryArtData.artId} galleryArtData={galleryArtData} />
        ))}
      </Masonry>
    </section>
  );
}
