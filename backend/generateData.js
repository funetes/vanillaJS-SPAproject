const fs = require('fs')
const axios = require('axios')

// Use your own API key
const apiKey = '6hVJqsrbLxFsgSEkZ0V2DFrlUPQavTCu'

// Prepare 200 search keywords
const keywords = [
  'hooray', 'seriously?', 'ironman', 'marvel',
  'racoon', 'thor', 'god', 'omg', 'thunder', 'hmm',
  'huh?', 'love', 'captain', 'america', 'pure',
  'purity', 'beautiful', 'awesome', 'movie', 'chips',
  'war', 'cute', 'bomb', 'tank', 'sun',
  'glasses', 'coke', 'hot', 'summer', 'winter',
  'snow', 'weather', 'dust', 'corn', 'interstellar',
  'star', 'planet', 'hey', 'humane', 'kind', 'funny',
  'iphone', 'apple', 'steve jobs', 'smart', 'maple',
  'funny cats', 'funny dog', 'come on', 'notification',

  'free', 'news', 'cheat', 'tax', 'makeuup', 'dating',
  'propose', 'props', 'tattoo', 'team', 'holic', 'fantasy',
  'fan', 'feelings', 'nothing', 'what', 'coding',
  'geek', 'cat', 'dog', 'doggo', 'catdog', 'adventure',
  'groove', 'grooving', 'mobile', 'web', 'hero',
  'listen music', 'play music', 'music video', 'hang out',
  'infinite', 'infinite loop', 'find out', 'understand',
  'why not', 'wow', 'cheer up', 'dont worry', 'be happy',
  'how to', 'sure', 'why not', 'hint', 'rich', 'fancy',
  'reaction', 'reality', 'weekend', 'food', 'sunny',
  'books', 'library', 'study', 'technology', 'canada',

  'superman', 'batman', 'ironman', 'movie',
  'great', 'sexy', 'boys', 'girls', 'man', 'woman',
  'black', 'black panther', 'captain marvel', 'vision', 'see',
  'galaxy', 'dude', 'watch out', 'oooh', 'pooh',
  'poo', 'hold on', 'tight', 'wait', 'no way',
  'guru', 'culture', 'programmers', 'learn', 'new',
  'brand', 'fire', 'trending', 'delicious', 'space',
  'culture', 'irony', 'sing', 'high', 'drug', 'slack',
  'metaphor', 'rhythm', 'blue', 'jazz', 'wonder',
  'life', 'dirty', 'really?', 'bluff', 'maybe',

  'not sure', 'nod', 'yes', 'how about', 'go to hell', 'nice',
  'too much', 'are you upset', 'angry', 'done', 'messed', 'kidding',
  'whatever', 'on my way', 'go home', 'magic', 'do it yourself',
  'believe me', 'too cold', 'joking', 'hahaha', 'i forgot something',
  'oops', 'fault', 'oh i see', 'i like you', 'i love you',
  'christmas', 'unbelivable', 'nobody', 'interesting',
  'holidays', 'santa', 'i told you', 'feel good',
  'shame', 'shameful', 'coke', 'sensitive', 'not fair',
  'overaction', 'parrot', 'right now', 'later', 'good night', 'good bye',
  'demon', 'scary', 'sad', 'welcome', 'party',
  'loud', 'run', 'go away', 'bothersome', 'joke',
]

const eachKeywordDataCount = 40
const allDataCount = keywords.length * eachKeywordDataCount

const allRequests = keywords
  .map((keyword) => {
    return axios({
      method: 'get',
      url: 'http://api.giphy.com/v1/gifs/search',
      params: {
        api_key: apiKey,
        q: keyword,
        limit: eachKeywordDataCount,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data.data)
    .then((gifs) => {
      return gifs.map((gif) => {
        const gifPath = gif.images.original_still.url.split('/media/')[1]
        const gifHashId = gifPath.split('/')[0]
        const resolvedUrl = `https://i.giphy.com/${gifHashId}.gif`

        // Extract properties from original data that seem useful
        return {
          id: gif.id,
          title: gif.title,
          kind: keyword,
          type: gif.type,
          slug: gif.slug,
          imageUrl: resolvedUrl,
          sourceUrl: gif.source_post_url,
          createdAt: gif.import_datetime,
          trendingAt: gif.trending_datetime,
        }
      })
    })
  })

Promise
  .all(allRequests)
  .then((allResponses) => {
    const result = allResponses.reduce(
      (flattened, array) => flattened.concat(...array),
      []
    )

    fs.writeFile(
      'data.json',
      JSON.stringify(result),
      'utf8',
      () => {}
    )
  })
  .catch((error) => {
    console.log('**************************************')
    console.log('******** Axios error occured. ********')
    console.log('**************************************')
    console.error(error.response)
    console.log('**************************************')
  })

module.exports = {
  allDataCount,
}
