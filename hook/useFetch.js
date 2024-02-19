import { useState, useEffect } from "react";
import axios from "axios";

// ! useFeatch => a costum hook used to featch data (bring data)
const useFetch = (endpoint, querys) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // ! option => the request that returned from the api back end
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "fbc7088113mshca2eff02f80766fp19a656jsnd943fa1fd970",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: querys,
  };

  // ! fetchData => used to bring data from api
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There are an error");
    } finally {
      setIsLoading(false);
    }
  };
  // ! useEffect => handle data fetching from the API
  useEffect(() => {
    fetchData();
  }, []);
  // refeatch the data if necessary
  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
