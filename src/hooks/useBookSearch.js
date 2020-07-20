import { useEffect, useState } from 'react';
import axios from 'axios';

function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  let cancel;
  useEffect(() => {
    if (!query) {
      return setBooks([]);
    };
    setLoading(true);
    setError(false);
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json?limit=15',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c),
    }).then((res) => {
      setBooks(prevBooks => {
        return [...new Set([...prevBooks, ...res.data.docs.map(book => book.title)])];
      });
      setHasMore(res.data.docs.length > 0);
      setLoading(false);
    }).catch(e => {
      if (axios.isCancel(e)) return;
      setError(e.message);
    })
    return () => cancel();
  }, [query, pageNumber]);

  return {
    loading,
    error,
    books,
    hasMore,
  };
}

export default useBookSearch;
