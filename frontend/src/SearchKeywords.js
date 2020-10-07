class SearchKeywords {
  data = [];
  constructor({ $parentTarget, onSearch }) {
    this.$searchKeywordsList = document.createElement('ul');
    this.$searchKeywordsList.classList.add('searchKeywords');
    this.onSearch = onSearch;
    this.$searchKeywordsList.style.display = 'none';
    $parentTarget.appendChild(this.$searchKeywordsList);
    const lastestKeyword = this.getKeywords();
    this.setState(lastestKeyword);
  }
  // local => component state => render
  getKeywords() {
    const keywords = JSON.parse(localStorage.getItem('searchKeyword'));
    return keywords ? keywords : [];
  }
  add(keyword) {
    const keywordsFromLS = this.getKeywords();
    keywordsFromLS.unshift(keyword);
    localStorage.setItem(
      'searchKeyword',
      JSON.stringify(keywordsFromLS.slice(0, 5))
    );
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

export default SearchKeywords;
