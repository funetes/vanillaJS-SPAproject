import { api } from './api.js';

class Banner {
  data = {
    items: [],
    current: 0,
  };
  constructor({ $target }) {
    this.$banner = document.createElement('div');
    this.$banner.classList.add('banner');
    this.$list = document.createElement('ul');
    this.$nextBtn = document.createElement('button');
    this.$prevBtn = document.createElement('button');

    this.$nextBtn.innerText = 'next';
    this.$prevBtn.innerText = 'prev';

    this.$banner.appendChild(this.$list);
    this.$banner.appendChild(this.$nextBtn);
    this.$banner.appendChild(this.$prevBtn);
    $target.appendChild(this.$banner);

    this.randomCats();
  }

  randomCats = async () => {
    const { data } = api.randomCats();
    this.setState({
      items: data.slice(0, 5).map(item => item),
      current: this.data.current,
    });
  };

  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    this.$list.innerHTML = this.data.items
      .map(item => `<li style="background-image:url(${item.url})"></li>`)
      .join('');
    console.log(this.$list.clientWidth);
  }
}

export default Banner;
