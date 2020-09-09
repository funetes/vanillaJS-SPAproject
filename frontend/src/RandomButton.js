class RandomButton {
  constructor({ onClick, $wrapper }) {
    this.$wrapper = $wrapper;
    this.$randomButton = document.createElement('button');
    this.$randomButton.classList.add('randomButton');
    this.$randomButton.innerText = 'random';
    this.$wrapper.$header.appendChild(this.$randomButton);

    this.$randomButton.addEventListener('click', onClick);
  }
}
