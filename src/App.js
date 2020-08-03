import React, { useState, useRef, useCallback } from 'react';
import useBookSearch from './hooks/useBookSearch';
import { Book, Message } from './components';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(0);

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
          setPageNumber((prevPageNumber) => prevPageNumber + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const handleOnChange = (e) => {
    setQuery(e.target.value);
    setPageNumber(0);
  };

  const renderBooks = (booksArray) => booksArray.map((book, index) => {
    if (booksArray.length === index + 1) {
      return (
        <Book book={book} ref={lastBookElementRef} key={book.id} />);
    }
    return (<Book book={book} key={book.id} />);
  });

  return (
    <div>
      <nav className="nav">
        <input onChange={handleOnChange} value={query} />
      </nav>
      {books && (<div className="books-container">{renderBooks(books)}</div>)}
      {(query && books.length === 0 && !loading) && (<Message text="No books found" />)}
      {loading && <Message text="Loading" />}
      {error && <Message text="Something went wrong" />}
    </div>
  );
}

export default App;
