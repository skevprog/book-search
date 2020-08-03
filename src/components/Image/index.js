import React from 'react';

const fallBackImage = require('../../utils/img/image-not-found.jpg');

function Image({ src, alt, ...rest }) {
  return (
    <img src={src || fallBackImage} style={{ width: '130px', height: '200px' }} alt={alt} {...rest} />
  );
}

export default Image;
