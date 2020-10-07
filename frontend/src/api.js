const API_ENDPOINT = 'http://localhost:4001';

const request = async url => {
  try {
    const res = await fetch(url);
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  } catch (error) {
    if (error.status === 500) {
      alert('internal error!');
      return { data: null };
    }
  }
};

export const api = {
  fetchCats: (keyword, limit) =>
    request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=${limit}`),
  fetchCatsPage: (keyword, page) =>
    request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`),
  randomCats: () => request(`${API_ENDPOINT}/api/cats/random50`),
  detailCat: id => request(`${API_ENDPOINT}/api/cats/${id}`),
};
