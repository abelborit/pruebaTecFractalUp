import { useEffect, useState } from "react";

export const useFetch = (URL) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);

    setLoading(true);

    fetch(URL, {
      signal: abortController.signal,
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer BQDe2zR5omHgAD-JH2xH69YX1UBlo24IpOFAlF4G0s5ekYDjldw5USqPT3fNjY6649b2hUrdynIkZzfb8w-YkbGA9ZYd8PEO7hRcJerR0YdwoX1N_KXD",
      },
    })
      .then((response) => {
        // console.log(response.json());
        return response.json();
      })
      .then((responseData) => setData(responseData))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request Cancelled");
        } else {
          setError(error);
        }
      })
      .finally(() => setLoading(false));

    // return () => abortController.abort();
  }, [URL]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Request Cancelled");
    }
  };

  return {
    useFetchData: data,
    useFetchError: error,
    useFetchLoading: loading,

    handleCancelRequest,
  };
};
