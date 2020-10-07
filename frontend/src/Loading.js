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
    const { data, $loading } = this;
    if (data.show) {
      $loading.classList.add('loading');
      $loading.innerText = 'Loading...';
    } else {
      $loading.classList.remove('loading');
      $loading.innerText = '';
    }
  }
}

export default Loading;
