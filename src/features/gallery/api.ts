import artsData from '../../configs/arts-data.json';

import { generateRandomId } from '../../utils';
import { removeTrailingSlash, naiveRelativeToAbsolutePathConverter } from './utils';

type ArtData = typeof artsData[number];

// NOTE: We could create a class out of each gallery item's data. That way we need not know of the structure of the
// underlying data structure that represents a single gallery item (Facade)
export class ArtPiece {
  #artData: ArtData;

  constructor(artData: ArtData) {
    this.#artData = artData;
  }

  get artName(): string {
    return this.#artData.name;
  }

  get artistName(): string {
    return this.#artData.artist.name;
  }

  get artId(): string {
    const initialValue = this.#artData.year;
    return generateRandomId(initialValue);
  }

  get previewImagePath(): string {
    // const { PUBLIC_URL = window.location.href } = process.env;
    const imagePath = this.#artData.images.gallery;
    return `${removeTrailingSlash(
      window.location.href
    )}${naiveRelativeToAbsolutePathConverter(imagePath)}`;
  }
}

export function getAllGalleryArt(): ArtPiece[] {
  const artArr = artsData.map(rawArtData => new ArtPiece(rawArtData));
  return artArr;
}
