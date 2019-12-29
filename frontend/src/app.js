console.log('app is running!')

const bodyTag = document.querySelector('body')

fetch('http://localhost:4001/api/gif/all?page=2')
  .then((response) => response.json())
  .then((response) => {
    const { data: gifs } = response

    bodyTag.innerHTML = gifs.map((gif) => `
      <div>
        GIF Title: ${gif.title} <br />
        GIF Slug: ${gif.slug} <br />
        <img src=${gif.imageUrl} alt=${gif.title} /> <br />
      </div>
    `).join('')
  })
