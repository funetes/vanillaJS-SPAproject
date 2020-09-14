class SearchKeywords {
  data = [];
  constructor({ $parentTarget, onSearch }) {
    this.$searchKeywordsList = document.createElement('ul');
    this.$searchKeywordsList.classList.add('searchKeywords');
    this.onSearch = onSearch;
    $parentTarget.appendChild(this.$searchKeywordsList);
    const lastestKeyword = this.getKeywords();
    lastestKeyword && this.setState(lastestKeyword);
  }
  // local => component state => render
  getKeywords() {
    return JSON.parse(localStorage.getItem('searchKeyword'));
  }
  add(keyword) {
    let keywords = [];
    const keywordsFromLS = localStorage.getItem('searchKeyword');
    keywordsFromLS && (keywords = JSON.parse(keywordsFromLS));
    keywords.unshift(keyword);
    localStorage.setItem('searchKeyword', JSON.stringify(keywords.slice(0, 5)));

    this.setState(this.getKeywords());
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const { data, $searchKeywordsList } = this;
    $searchKeywordsList.innerHTML = data
      .map(
        item =>
          `<li>
        <button>${item}</button>
      </li>`
      )
      .join('');

    $searchKeywordsList.addEventListener('click', e => {
      const {
        target: { tagName, innerText },
      } = e;

      tagName === 'BUTTON' && this.onSearch(innerText);
    });
  }
}
