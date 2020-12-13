const BASE_URL = 'https://api.covid19api.com';

export const getData = async (dataParametrUrl = '') => {
  try {
    const url = `${BASE_URL}/${dataParametrUrl}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (e) {
    return e;
  }
};
