import React from 'react';

const fallBackImage = '';

function Image({ src, alt, ...rest }) {
  return (
    <img src={src} alt={alt} onError={fallBackImage} {...rest} />
  );
}

export default Image;
