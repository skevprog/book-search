import React, { forwardRef } from 'react';
import Image from '../Image';

function Book({ book }, ref) {
  const { title, cover } = book;
  return (
    <div className="book">
      <h4
        ref={ref}
      >
        {title}
      </h4>
      <Image src={cover} alt={title} />
    </div>
  );
}

export default React.memo(forwardRef(Book));
