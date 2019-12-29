const express = require('express')
const path = require('path')
const router = express.Router()
const { getRandomNumber, readFile } = require('./utils')
const { allDataCount } = require('./generateData')

const pagingUnit = 10
const dataFilePath = path.resolve(__dirname, 'data.json')
const resolvingData = readFile(dataFilePath)

/**
 * @api {get} /gif/all List All Gifs
 * @apiName ListGif
 * @apiGroup Gif
 *
 * @apiParam {Number} page Page for selecting certain 10 gifs
 *
 * @apiSuccess {Array} data An array of all returned gifs
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "data": [
 *        {
 *          "id": "11sBLVxNs7v6WA",
 *          "title": "hooray-people",
 *          "kind": "hooray",
 *          "type": "gif",
 *          "slug": "cheer-cheering-11sBLVxNs7v6WA",
 *          "imageUrl": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *          "sourceUrl": "https://allinonefun.tumblr.com/post/64576645275/all-in-one-fun-dancing-cat",
 *          "createdAt": "2015-01-29 16:30:00",
 *          "trendingAt": "2018-03-11 12:30:00",
 *        },
 *        {
 *          "id": "fda28DDh28dhgaA",
 *          "title": "no-way",
 *          "kind": "no way",
 *          "type": "gif",
 *          "slug": "no-way-fdfah2ff21AFD",
 *          "imageUrl": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *          "sourceUrl": "https://allinonefun.tumblr.com/post/64576645275/all-in-one-fun-dancing-cat",
 *          "createdAt": "2015-01-29 16:30:00",
 *          "trendingAt": "2018-03-11 12:30:00",
 *        },
 *     ]
 *   }
 *
 * @apiError PageNotProvided The page query parameter should be given.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Query parameter(page) should be given."
 *     }
 */
router.get('/gif/all', (req, res) => {
  const page = Number(req.query.page)

  if (Number.isNaN(page)) {
    return res
      .status(400)
      .send({
        message: 'Query parameter(page) should be given.',
      })
  } else if (page < 1) {
    return res
      .status(400)
      .send({
        message: 'Query parameter(page) should be more than 1.',
      })
  }

  // Last page: 853
  const startIndex = (page - 1) * pagingUnit
  const endIndex = startIndex + pagingUnit

  resolvingData
    .then((data) => {
      return res
        .status(200)
        .send({
          data: data.slice(startIndex, endIndex),
        })
    })
    .catch((error) => {
      console.error(error)

      return res
        .status(500)
        .send({
          message: 'An error has occurred while fetching data.',
        })
    })
})

// GET RANDOM 50 Gifs
/**
 * @api {get} /gif/random50 Get Random 50 Gifs
 * @apiName GetRandom50Gif
 * @apiGroup Gif
 *
 * @apiSuccess {Array} data An array of randomly returned 50 gifs
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "data": [
 *        {
 *          "id": "11sBLVxNs7v6WA",
 *          "title": "hooray-people",
 *          "kind": "hooray",
 *          "type": "gif",
 *          "slug": "cheer-cheering-11sBLVxNs7v6WA",
 *          "imageUrl": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *          "sourceUrl": "https://allinonefun.tumblr.com/post/64576645275/all-in-one-fun-dancing-cat",
 *          "createdAt": "2015-01-29 16:30:00",
 *          "trendingAt": "2018-03-11 12:30:00",
 *        },
 *        {
 *          "id": "fda28DDh28dhgaA",
 *          "title": "no-way",
 *          "kind": "no way",
 *          "type": "gif",
 *          "slug": "no-way-fdfah2ff21AFD",
 *          "imageUrl": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *          "sourceUrl": "https://allinonefun.tumblr.com/post/64576645275/all-in-one-fun-dancing-cat",
 *          "createdAt": "2015-01-29 16:30:00",
 *          "trendingAt": "2018-03-11 12:30:00",
 *        },
 *     ]
 *   }
 */
router.get('/gif/random50', (req, res) => {
  const minIndex = 0
  const maxIndex = allDataCount - 1
  const randomFiftyIndice = Array
    .from(Array(50).keys())
    .map(() => getRandomNumber(minIndex, maxIndex))

  resolvingData
    .then((data) => {
      return res
        .status(200)
        .send({
          data: data
            .filter((_, index) => randomFiftyIndice.includes(index)),
        })
    })
    .catch((error) => {
      console.error(error)

      return res
        .status(500)
        .send({
          message: 'An error has occurred while fetching data.',
        })
    })
})

// SEARCH GIF IMAGES WITH THE GIVEN QUERY PARAMETER(q)
/**
 * @api {get} /gif/search Search Gifs that match the given query
 * @apiName SearchGifs
 * @apiGroup Gif
 * 
 * @apiParam {String} q Query for searching gifs
 *
 * @apiSuccess {Array} data An array of searched gifs
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "data": [
 *        {
 *          "id": "11sBLVxNs7v6WA",
 *          "title": "hooray-people",
 *          "kind": "hooray",
 *          "type": "gif",
 *          "slug": "cheer-cheering-11sBLVxNs7v6WA",
 *          "imageUrl": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *          "sourceUrl": "https://allinonefun.tumblr.com/post/64576645275/all-in-one-fun-dancing-cat",
 *          "createdAt": "2015-01-29 16:30:00",
 *          "trendingAt": "2018-03-11 12:30:00",
 *        },
 *        {
 *          "id": "fda28DDh28dhgaA",
 *          "title": "no-way",
 *          "kind": "no way",
 *          "type": "gif",
 *          "slug": "no-way-fdfah2ff21AFD",
 *          "imageUrl": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *          "sourceUrl": "https://allinonefun.tumblr.com/post/64576645275/all-in-one-fun-dancing-cat",
 *          "createdAt": "2015-01-29 16:30:00",
 *          "trendingAt": "2018-03-11 12:30:00",
 *        },
 *     ]
 *   }
 */
router.get('/gif/search', (req, res) => {
  const { q } = req.query

  if (!q) {
    return res
      .status(400)
      .send({
        message: 'Query parameter(q) should be given in order to search gif images.',
      })
  }

  resolvingData
    .then((data) => {
      return res
        .status(200)
        .send({
          data: data
            .filter((gif) => gif.kind.includes(q) || q.includes(gif.kind)),
        })
    })
    .catch((error) => {
      console.error(error)

      return res
        .status(500)
        .send({
          message: 'An error has occurred while fetching data.',
        })
    })
})

// GET A GIF IMAGE WITH THE GIVEN ID
/**
 * @api {get} /gif/:id Get a Gif that has the given id
 * @apiName GetGif
 * @apiGroup Gif
 * 
 * @apiParam {String} id ID for getting a gif
 *
 * @apiSuccess {Object} data An object of a found gif
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "data": {
 *        "id": "fda28DDh28dhgaA",
 *        "title": "no-way",
 *        "kind": "no way",
 *        "type": "gif",
 *        "slug": "no-way-fdfah2ff21AFD",
 *        "imageUrl": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *        "sourceUrl": "https://allinonefun.tumblr.com/post/64576645275/all-in-one-fun-dancing-cat",
 *        "createdAt": "2015-01-29 16:30:00",
 *        "trendingAt": "2018-03-11 12:30:00",
 *      }
 *   }
 */
router.get('/gif/:id', (req, res) => {
  const { id } = req.params

  if (!id) {
    return res
      .status(400)
      .send({
        message: 'Parameter(id) should be given.',
      })
  }

  resolvingData
    .then((data) => {
      const foundGif = data.find((gif) => gif.id === id)

      if (!foundGif) {
        return res
          .status(400)
          .send({
            message: 'The gif image with the given id could not be found.',
          }) 
      }

      return res
        .status(200)
        .send({
          data: foundGif,
        })
    })
    .catch((error) => {
      console.error(error)

      return res
        .status(500)
        .send({
          message: 'An error has occurred while fetching data.',
        })
    })
})

module.exports = router
