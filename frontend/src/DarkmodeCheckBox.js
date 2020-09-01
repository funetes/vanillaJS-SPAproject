class DarkmodeCheckBox {
  //<div id="App">
  // <input tyle='checkbox'/>
  //</div>
  constructor({ $target }) {
    const $darkModeInput = document.createElement('input');
    this.$darkModeInput = $darkModeInput;
    this.$darkModeInput.type = 'checkbox';
    this.$darkModeInput.classList.add('DarkmodeCheckBox');
    $target.appendChild($darkModeInput);
    this.darkmodeInit();
  }
  handleDarkmode(e) {
    document.documentElement.setAttribute(
      'color-mode',
      e.target.checked ? 'dark' : 'light'
    );
  }
  darkmodeInit() {
    this.prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: Dark)').matches;

    document.documentElement.setAttribute(
      'color-mode',
      this.prefersDark ? 'dark' : 'light'
    );

    this.$darkModeInput.checked = this.prefersDark;
    this.$darkModeInput.addEventListener('change', this.handleDarkmode);
  }
}
