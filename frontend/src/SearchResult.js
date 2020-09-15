class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, onClick, onNextPage }) {
    this.$searchResult = document.createElement('section');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.onClick = onClick;
    this.render();

    this.observer = new IntersectionObserver(
      items => {
        // lazy load, infinite scroll
        items.forEach(item => {
          if (item.isIntersecting) {
            // lazy load
            item.target.querySelector('img').src = item.target.querySelector(
              'img'
            ).dataset.src;
            if (
              parseInt(item.target.dataset.index, 10) ===
              this.data.length - 1
            ) {
              // api call
              onNextPage();
            }
          }
        });
      },
      {
        threshold: 0.2,
      }
    );
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const { data, $searchResult, onClick, observer } = this;

    data &&
      (data.length === 0
        ? ($searchResult.innerHTML =
            '<div class="EmptyData">검색결과가 없습니다.😭</div>')
        : ($searchResult.innerHTML = data
            .map(
              (cat, i) => `
          <div class="item" data-index=${i}>
            <img src='https://via.placeholder.com/200x300' data-src=${cat.url} alt=${cat.name} />
          </div>
        `
            )
            .join('')));

    data &&
      data.length !== 0 &&
      $searchResult.querySelectorAll('.item').forEach(($item, index) => {
        $item.addEventListener('click', () => {
          onClick(data[index]);
        });
        observer.observe($item);
      });
  }
}
