import React, { useState, useRef, useCallback } from 'react';
import useBookSearch from './hooks/useBookSearch';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const {
    loading, books, hasMore, error,
  } = useBookSearch(query, pageNumber);

  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const handleOnChange = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  const renderBooks = (booksArray = []) => {
    if (!booksArray.length) return (<div>No books to show</div>);
    return booksArray.map((book, index) => {
      if (booksArray.length === index + 1) {
        return (
          <div>
            <h2
              style={{ border: 'solid 2px red', padding: '1em' }}
              ref={lastBookElementRef}
              key={book.id}
            >
              {book.title}
            </h2>
            <img src={book.cover} alt={book.title} />
          </div>
        );
      }
      return (
        <div>
          <h2
            key={book.id}
          >
            {book.title}
          </h2>
          <img src={book.cover} alt={book.title} />
        </div>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={handleOnChange} value={query} />
        {books.length && renderBooks(books)}
        {loading && <h1>Loading...</h1>}
        {error && <h1>Something went wrong</h1>}
      </header>
    </div>
  );
}

export default App;
