import React, { forwardRef } from 'react';
import Image from '../Image';

function Book({ book }, ref) {
  const { title, cover } = book;
  return (
    <div>
      <p
        ref={ref}
      >
        {title}
      </p>
      <Image src={cover} alt={title} />
    </div>
  );
}

export default React.memo(forwardRef(Book));
