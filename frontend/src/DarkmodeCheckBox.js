class DarkmodeCheckBox {
  constructor({ $target }) {
    const $darkModeInput = document.createElement('input');
    this.$darkModeInput = $darkModeInput;
    this.$darkModeInput.type = 'checkbox';
    this.$darkModeInput.classList.add('DarkmodeCheckBox');
    $target.appendChild($darkModeInput);
    this.darkmodeInit();
  }
  setHtmlAttribute(attribute, isDark) {
    document.documentElement //
      .setAttribute(attribute, isDark ? 'dark' : 'light');
    return;
  }
  handleDarkmode(e) {
    return this.setHtmlAttribute('color-mode', e.target.checked);
  }
  darkmodeInit() {
    this.prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: Dark)').matches;

    this.setHtmlAttribute('color-mode', this.prefersDark);
    this.$darkModeInput.checked = this.prefersDark;
    this.$darkModeInput.addEventListener(
      'change',
      this.handleDarkmode.bind(this)
    );
  }
}
