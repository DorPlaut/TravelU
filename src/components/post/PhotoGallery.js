import React from 'react';
import ImageGallery from 'react-image-gallery';

function PhotoGallery({ photos, showThumbnails }) {
  const images = photos.map((i) => {
    return { original: i, thumbnail: i };
  });
  return (
    <ImageGallery
      items={images}
      showThumbnails={showThumbnails}
      showPlayButton={showThumbnails}
    />
  );
}

export default PhotoGallery;
