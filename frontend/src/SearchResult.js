class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, onClick }) {
    this.$searchResult = document.createElement('section');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    // this.data = null;
    this.onClick = onClick;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data) {
      if (this.data.length === 0) {
        this.$searchResult.innerHTML =
          '<div class="EmptyData">검색결과가 없습니다.😭</div>';
      } else {
        this.$searchResult.innerHTML = this.data
          .map(
            cat => `
          <div class="item">
            <img src=${cat.url} alt=${cat.name} />
          </div>
        `
          )
          .join('');
      }
    }

    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
