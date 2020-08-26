import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes?';

const extractBookData = (bookData) => {
  const { id, volumeInfo: { title, imageLinks } } = bookData;
  return {
    id,
    title,
    cover: imageLinks?.thumbnail,
  };
};

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
      params: {
        q: query, maxResults: 20, startIndex: pageNumber,
      },
      cancelToken: new axios.CancelToken((c) => {
        cancel = c;
      }),
    }).then((res) => {
      const { items } = res.data;
      if (!items) {
        setLoading(false);
        return setHasMore(false);
      }
      setBooks((prevBooks) => [...prevBooks, ...items.map(extractBookData)]);
      setHasMore(items.length > 0);
      return setLoading(false);
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
