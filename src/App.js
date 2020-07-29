import React, { useState, useRef, useCallback } from 'react';
import useBookSearch from './hooks/useBookSearch';
import { Book, Message } from './components';
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

  const renderBooks = (booksArray = []) => booksArray.map((book, index) => {
    if (booksArray.length === index + 1) {
      return (
        <Book ref={lastBookElementRef} book={book} />);
    }
    return (<Book book={book} />);
  });

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={handleOnChange} value={query} />
        {books && books.length > 0 && renderBooks(books)}
        {(query && books.length === 0 && !loading) && (<Message text="No books found" />)}
        {loading && <Message text="Loading" />}
        {error && <Message text="Something went wrong" />}
      </header>
    </div>
  );
}

export default App;
