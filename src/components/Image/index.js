import React from 'react';

const fallBackImage = require('../../utils/img/image-not-found.jpg');

function Image({ src, alt, ...rest }) {
  return (
    <img className="img" src={src || fallBackImage} alt={alt} {...rest} />
  );
}

export default Image;
