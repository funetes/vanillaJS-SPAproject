const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    this.$searchInput = document.createElement('input');
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.className = 'SearchInput';
    $target.appendChild(this.$searchInput);

    this.$searchInput.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
      }
    });
  }
}
