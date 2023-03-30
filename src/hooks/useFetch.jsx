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
          "Bearer BQBU2HXEqR8F2bEpb80BAs8xiAJdhD9KlJVnm7PfJg0tPgchedJ8gSuzIomkCVYqFEwcuEH5E2whMlTM0Yrz17ljhR1is0f2xtuP0_AbkWxmkuKSY-pG",
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
