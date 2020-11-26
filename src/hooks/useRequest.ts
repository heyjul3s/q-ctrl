import React, { useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

export function useRequest<D>(
  api: string
): {
  data?: D;
  error: Error | string | null;
  loading: boolean;
} {
  const [data, setData] = React.useState<D | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | string | null>(null);

  useEffect(() => {
    setLoading(true);
    const source: CancelTokenSource = axios.CancelToken.source();

    axios
      .get(api, {
        cancelToken: source.token
      })
      .then((response) => {
        if (response.status !== 200) {
          setError('Request Failed');
        } else {
          setData(response.data);
        }

        setLoading(false);
      })
      .catch((e) => {
        // console.error(e);
      });

    return () => {
      source.cancel('Request cancelled.');
    };
  }, []);

  return {
    data,
    error,
    loading
  };
}
