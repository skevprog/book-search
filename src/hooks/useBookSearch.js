import { useEffect, useState } from 'react';
import axios from 'axios';

function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  let cancel;
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c),
    }).then((res) => {
      console.log(res.data.docs)
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
