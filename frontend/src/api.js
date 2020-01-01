// 나중에 프로그래머스 서버로 바꿔야 함
const API_ENDPOINT = "http://localhost:4001";

const api = {
  fetchGif: keyword => {
    return fetch(`${API_ENDPOINT}/api/gif/search?q=${keyword}`).then(res =>
      res.json()
    );
  }
};
