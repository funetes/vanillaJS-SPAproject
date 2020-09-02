const DARK = 'dark';
const LIGHT = 'light';
const COLOR_MODE = 'color-mode';
class DarkmodeCheckBox {
  constructor({ $target }) {
    const $darkModeInput = document.createElement('input');

    this.prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: Dark)').matches;
    this.$darkModeInput = $darkModeInput;
    this.$darkModeInput.type = 'checkbox';

    $target.appendChild($darkModeInput);

    this.darkmodeInit();
  }
  setHtmlAttribute(attribute) {
    return document.documentElement.setAttribute(
      attribute,
      localStorage.getItem(COLOR_MODE)
    );
  }
  handleChange(e) {
    const { setHtmlAttribute } = this;
    const {
      target: { checked },
    } = e;
    localStorage.setItem(COLOR_MODE, checked ? DARK : LIGHT);
    return setHtmlAttribute(COLOR_MODE);
  }
  darkmodeInit() {
    const {
      $darkModeInput,
      setHtmlAttribute,
      handleChange,
      prefersDark,
    } = this;

    localStorage.getItem(COLOR_MODE) ||
      localStorage.setItem(COLOR_MODE, prefersDark ? DARK : LIGHT);

    setHtmlAttribute(COLOR_MODE);

    $darkModeInput.checked = localStorage.getItem(COLOR_MODE) === DARK;

    $darkModeInput.addEventListener('change', handleChange.bind(this));
    return;
  }
}
