class Header {
  constructor({ $target, onSearch, onClick }) {
    this.$header = document.createElement('header');
    this.$header.classList.add('header');
    $target.appendChild(this.$header);

    this.searchInput = new SearchInput({
      $target: this.$header,
      $parentTarget: $target,
      onSearch,
    });

    this.randomButton = new RandomButton({
      $target: this.$header,
      onClick,
    });
  }
}
