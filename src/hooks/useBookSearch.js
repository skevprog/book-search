import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes?';

function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  let cancel;
  useEffect(() => {
    if (!query) {
      setLoading(false);
      return setBooks([]);
    }
    setLoading(true);
    axios({
      method: 'GET',
      url: API_URL,
      params: { q: query, maxResults: 25, startIndex: pageNumber },
      cancelToken: new axios.CancelToken((c) => {
        cancel = c;
      }),
    }).then((res) => {
      const { items } = res.data;
      setBooks((prevBooks) => [...new Set([...prevBooks, ...items.map((book) => ({
        id: book.etag,
        title: book.volumeInfo.title,
        cover: book.volumeInfo.imageLinks?.thumbnail,
      }))])]);
      setHasMore(items.length > 0);
      setLoading(false);
    }).catch((e) => {
      if (axios.isCancel(e)) return;
      setError(true);
    });
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
