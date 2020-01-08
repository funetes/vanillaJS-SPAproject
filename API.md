# API

## 1. Model
### Cat
```typescript
{
  "id": string,
  "title": string,
  "kind": string,
  "type": string,
  "slug": string,
  "imageUrl": string,
  "sourceUrl": string,
  "createdAt": string,
  "trendingAt": string,
}

// example
{
  "id": "11sBLVxNs7v6WA",
  "title": "hooray-people",
  "kind": "hooray",
  "type": "gif",
  "slug": "cheer-cheering-11sBLVxNs7v6WA",
  "imageUrl": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
  "sourceUrl": "https://allinonefun.tumblr.com/post/64576645275/all-in-one-fun-dancing-cat",
  "createdAt": "2015-01-29 16:30:00",
  "trendingAt": "2018-03-11 12:30:00",
},
```

## 2. Endpoints
## GET /cats/random50
- ### Request parameter
  None
- ### Query paramter
  None
- ### Response
  Success 200

  |Field name|Type|Description|
  |-|-|-|
  |data|Array|랜덤한 50개의 고양이 사진 목록입니다.|

  ```typescript
  HTTP/1.1 200 OK
  {
    "data": Cat[]
  }
  ```

## 2. GET /cats/search
- ### Request parameter
  None
- ### Query paramter
  |Field name|Type|Description|
  |-|-|-|
  |q|string|검색 keyword 입니다.|

- ### Response
  Success 200

  |Field name|Type|Description|
  |-|-|-|
  |data|Array|Keyword로 검색된 고양이 사진 목록입니다.|

  ```typescript
  HTTP/1.1 200 OK
  {
    "data": Cat[]
  }
  ```

## 3. GET /cats/:id
- ### Request parameter
  |Field name|Type|Description|
  |-|-|-|
  |id|string|고양이 사진의 id값 입니다.|
- ### Query paramter
  None

- ### Response
  Success 200

  |Field name|Type|Description|
  |-|-|-|
  |data|Object|Id로 검색된 고양이 사진 입니다.|

  ```typescript
  HTTP/1.1 200 OK
  {
    "data": Cat
  }
  ```
