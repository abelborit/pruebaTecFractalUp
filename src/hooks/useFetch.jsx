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
          "Bearer BQDwNX9JBSjWT5tNqvuRSDtksYNT_KavAc231U0bcvOl_QCQcIBgHplicVTF_IYE7mOtSqm7i1rAQzihzRggqiKBb7X72w0P3TCWguM4EfWcrJaBp2UA",
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
