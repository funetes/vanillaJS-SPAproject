// 나중에 프로그래머스 서버로 바꿔야 함
const API_ENDPOINT = "http://localhost:4001";

const api = {
  fetchCats: keyword => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then(res =>
      res.json()
    );
  }
};
