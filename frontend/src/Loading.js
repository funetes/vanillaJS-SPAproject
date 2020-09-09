class Loading {
  data = { show: false };
  constructor({ $target }) {
    this.$loading = document.createElement('div');
    $target.appendChild(this.$loading);
    this.render();
  }
  show() {
    this.setState({
      show: true,
    });
  }
  hide() {
    this.setState({
      show: false,
    });
  }
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    if (this.data.show) {
      this.$loading.classList.add('loading');
      this.$loading.innerText = 'Loading...';
    } else {
      this.$loading.classList.remove('loading');
      this.$loading.innerText = '';
    }
  }
}
