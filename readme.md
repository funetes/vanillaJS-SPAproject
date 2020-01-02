# 과제 설명

- giphy에서 크롤링 된 데이터를 이용해 움짤을 검색하는 간단한 코드
- es6 class 기반으로 베이스 코드가 작성되어 있음
- 해당 코드에는 잠재적인 오류들이 있음
- 해당 코드 기반으로 요구사항을 나열
- 해결한 잠재적 오류와 해결한 요구사항을 기반으로 채점

# 실행법

- backend/app.js 실행
- 이후 frontend/index.html 을 브라우저로 열면 실행 됨
  - 특정 키워드만 검색 가능, ex) hooray

# 검토해야하는 것

- Giphy license
  - 크롤링해서 쓴다지만 어쨌든 상업적 목적이므로..?
- 코드에 오류를 얼마나 심을 것인지
- 비교적 자바스크립트의 최신 기능들에 대해서 넣을지 말지
  - async, await와 module 같은 경우
  - 어차피 보너스 문제니까 상관 없을 것 같기도 함
- API에서 약 5%의 확률로 에러를 내도록 만드는 게 좋을 듯 함
  - 그냥 rand 굴려서 5%에 해당하면 에러 발생시키기
  - 에러 관련 처리를 했는지에 대해 보기 위함
- 테스트 코드 작성을 요구사항에 넣을지가 고민
- 기본 스타일링을 어디까지 제공할 것인가

# 문항지

## 오류 수정

- 이미지 검색 후 이미지를 클릭하면 모달이 뜨는데, esc키를 누르거나 x 버튼을 누르면 닫히도록 수정하기(5점)
- 서버에서 에러가 반환되는 경우의 처리를 하기(5점)
- 검색결과 데이터가 없는 경우 화면에 아무것도 나타나지 않는데, 검색 결과가 없다고 알리도록 처리하기(5점)

## 요구사항

### 1. 구현
- 페이지 진입 시 포커스가 input에 가도록 만들고, 키워드를 입력한 상태에서 input 클릭 시 기존에 입력된 키워드가 삭제되도록 만든다. (3점)
- es6 module 형태로 코드를 변경한다. (3점)
  - 해당 코드 실행을 위해 http-server 모듈을 통해 index.html 을 띄워야 한다는 걸 알려야 함
- api fetch 코드를 async, await 문을 이용한 것으로 수정한다. (10점)
  - try, catch 문을 사용하지 않은 경우 5점 감점
- api의 status code에 따라 에러 메시지를 분리하여 작성한다. (5점)
  - 404: 페이지 없음, 403: 인가 안됨, 500: 서버 에러 등등
- api의 반복적인 부분을 refactoring하여 사용한다. (5점)
  - 예시
  ```
    const request = async (url: string) => {
      try {
        const result = await fetch(url);
        return result.json();
      } catch (e) {
        console.warn(e);
      }
    }

    const api = {
      fetchGif: keyword => {
        return request(`${API_ENDPOINT}/api/gif/search?q=${keyword}`);
      },
      fetchGifAll: () => {
        return request(`${API_ENDPOINT}/api/gif/all`);
      }
    };
  ```
- SearchResult에 각 item을 클릭하는 이벤트를 이벤트 델리게이션 기법을 이용한 방법으로 수정한다. (10점)
- 스크롤이 끝에 닿는 경우 다음 페이지를 로딩하도록 만든다. (10점)
- 최근 검색한 키워드를 SearchInput 아래에 표시하도록 하고, 클릭하면 해당 키워드로 검색이 일어나도록 만든다. (10점)
- 페이지를 새로고침해도 마지막 검색결과 화면이 유지되도록 만든다. (15점)
  - local storage나 cookie 등을 이용해야하는데 질문의 의도가 어려운 것 같으면 질문에 해당 내용을 언급
- SearchInput 옆에 버튼을 하나 배치하고, 이 버튼을 클릭 시 `/api/gif/random`을 호출하여 화면에 뿌리는 기능을 추가하기(10점)
  - 해당 버튼을 그리는 코드는 SearchInput에 넣되, 클릭 시 실제로 api를 호출하는 코드는 App 컴포넌트에 있어야 한다.
- Image를 lazy load를 이용해 실제로 화면에 보이게 될 때 load한다. (10점)
- Component 내부의 함수들이나 util 함수들이 작게 잘 나누어져 있다. (5점)

### 2. 테스트 코드 (optional)
*테스트 코드는 전체적으로 bonus score의 느낌으로 점수를 부여합니다.*
- Test suite과 각 test의 목적을 잘 기술하였다. (5점)
  - isNumber test (x)
  - isNumber 함수는 number type의 argument를 받으면 true를 리턴합니다. (o)
- 각 component의 내부에 있는 함수들이나, util 함수들을 테스트할 수 있게 분리하였다. (10점)
- 조건문이 있는 함수의 경우, edge case에 대한 테스트가 있다. (5점)
- 테스트 코드 내에서 각 test마다 반복적으로 필요한 부분을 life cycle 함수를 이용해 관리하였다. (5점)
