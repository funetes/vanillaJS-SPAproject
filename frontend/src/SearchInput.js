const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    this.$wrapper = document.createElement('header');
    this.$searchInput = document.createElement('input');
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.className = 'SearchInput';
    this.$wrapper.appendChild(this.$searchInput);
    $target.appendChild(this.$wrapper);

    this.$searchInput.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });
  }
  render() {}
}
