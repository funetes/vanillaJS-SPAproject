class Header {
  constructor({ $target }) {
    this.$header = document.createElement('header');
    this.$header.classList.add('header');
    $target.appendChild(this.$header);
  }
}
