import React from 'react';

export const apiStates = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const url = 'http://api.openweathermap.org/data/2.5/weather?';

const app_id  = '18a5547614cdf92e96353105c48aa67b';

export const objToQueryString =  (obj) => {
    const keyValuePairs = [];
    for (let i = 0; i < Object.keys(obj).length; i += 1) {
      keyValuePairs.push(`${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(Object.values(obj)[i])}`);
    }
    return keyValuePairs.join('&');
}

export const useApi = (city) => {
  const [data, setData] = React.useState({
    state: apiStates.LOADING,
    error: '',
    data: [],
  });

  const setPartData = (partialData) => setData({ ...data, ...partialData });

  React.useEffect(() => {
     
    setPartData({
      state: apiStates.LOADING,
    });
    fetch(url+objToQueryString({
        q : city,
        appid : app_id,
        units : 'metric'
        }))
      .then((response) => response.json())
      .then((data) => {
        setPartData({
          state: apiStates.SUCCESS,
          data
        });
      })
      .catch(() => {
       setPartData({
          state: apiStates.ERROR,
          error: 'fetch failed'
        });
      });
  }, []);

  return data;
};