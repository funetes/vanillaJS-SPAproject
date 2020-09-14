class RandomButton {
  constructor({ onClick, $target }) {
    this.$randomButton = document.createElement('button');
    this.$randomButton.classList.add('randomButton');
    this.$randomButton.innerText = 'random';
    $target.appendChild(this.$randomButton);

    this.$randomButton.addEventListener('click', onClick);
  }
}
