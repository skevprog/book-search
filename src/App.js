import React, { useState, useRef, useCallback } from 'react';
import useBookSearch from './hooks/useBookSearch';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, books, hasMore, error } = useBookSearch(query, pageNumber);

  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      })
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  )

  const handleOnChange = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };
  return (
    <div className="App">
      <header className="App-header">
        <input onChange={handleOnChange} value={query} />
        {books && books.map((book, index) => {
          if (books.length === index + 1) {
            return (<p ref={lastBookElementRef} key={book}>{book}</p>);
          } else {
            return (<p key={book}>{book}</p>);
          }
        })
        }
        {loading && <h1>Loading...</h1>}
        {error && <h2>{error}</h2>}
      </header>
    </div>
  );
}

export default App;
