import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (json.Error) {
          throw new Error(json.Error);
        }
        setResponse(json);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [url]);
  return [response, error];
};

export default useFetch;
