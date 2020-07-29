import React, { forwardRef } from 'react';

function Book({ book }, ref) {
  const { id, title, cover } = book;
  return (
    <div>
      <p
        ref={ref}
        key={id}
      >
        {title}
      </p>
      <img src={cover} alt={title} />
    </div>
  );
}

export default forwardRef(Book);
