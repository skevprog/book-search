import React, { useState } from 'react';
import useBookSearch from './hooks/useBookSearch';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, books } = useBookSearch(query, pageNumber);

  const handleOnChange = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={handleOnChange} value={query} />
        {loading ?
          <h1>Loading...</h1>
          :
          books.map(book => (<p key={book}>{book}</p>))
        }
      </header>
    </div>
  );
}

export default App;
