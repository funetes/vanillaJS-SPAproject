const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ onSearch, $wrapper }) {
    this.$wrapper = $wrapper;
    this.$searchInput = document.createElement('input');
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.className = 'SearchInput';
    this.$wrapper.$header.appendChild(this.$searchInput);

    this.$searchInput.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });
  }
}
