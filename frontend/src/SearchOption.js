class SearchOption {
  constructor({ $target, onLimitChange }) {
    this.$select = document.createElement('select');
    this.limit = [50, 25, 10];

    this.limit.map(option => {
      const $option = document.createElement('option');
      $option.textContent = option;
      $option.value = option;
      this.$select.appendChild($option);
    });
    $target.appendChild(this.$select);
    this.$select.addEventListener('change', e => {
      const limit = parseInt(e.target.value);
      onLimitChange(limit);
    });
  }
}

export default SearchOption;
