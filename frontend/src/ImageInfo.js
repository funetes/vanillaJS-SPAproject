class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.render();
  }
  showDetail(id) {
    api.detailCat(id).then(({ data }) => {
      this.setState({
        visible: true,
        image: data,
      });
    });
  }
  closeModal() {
    this.setState({
      visible: false,
      image: null,
    });
    this.render();
  }
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    if (this.data.visible) {
      const { name = 'undefined', url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = 'block';
      this.$imageInfo
        .querySelector('.close')
        .addEventListener('click', () => this.closeModal());
      window.addEventListener(
        'keydown',
        e => e.key === 'Escape' && this.closeModal()
      );
      this.$imageInfo.addEventListener(
        'click',
        e => e.target.nodeName !== 'IMG' && this.closeModal()
      );
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}
