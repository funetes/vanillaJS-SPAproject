const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $parentTarget, $target, onSearch }) {
    this.$searchInput = document.createElement('input');
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.className = 'SearchInput';
    this.onSearch = onSearch;
    $target.appendChild(this.$searchInput);
    // 검색어
    this.searchKeywords = new SearchKeywords({ $parentTarget, onSearch });

    this.$searchInput.addEventListener('keypress', e => {
      const {
        key,
        target: { value },
      } = e;
      if (key === 'Enter') {
        this.searchKeywords.add(value);
        this.onSearch(value);
      }
    });
    this.searchInit();
  }

  searchInit() {
    const lastestKeyword = this.searchKeywords.getKeywords();
    lastestKeyword && this.onSearch(lastestKeyword[0]);
  }
}
