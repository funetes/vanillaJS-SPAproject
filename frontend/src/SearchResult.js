class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  // <div id="App">
  //  <input placeholder.../>
  //  <div class='SearchResult'>
  //    <div class="item"> <= onClick
  //      <img src=${cat.url} alt=${cat.name} />
  //    </div>
  //        ...   <= onClick
  //  </div>
  //</div>
  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement('div');
    //이 div 자체가 컨테이너
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        cat => `
          <div class="item">
            <img src=${cat.url} alt=${cat.name} />
          </div>
        `
      )
      .join('');

    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
