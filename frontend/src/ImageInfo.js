import { api } from './api.js';

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
  showDetail = async id => {
    const { data } = await api.detailCat(id);
    this.setState({
      visible: true,
      image: data,
    });
  };
  closeModal = () => {
    this.setState({
      visible: false,
      image: null,
    });
    this.render();
  };
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    const { data, $imageInfo, closeModal } = this;
    if (data.visible) {
      const { name = 'undefined', url, temperament, origin } = data.image;

      $imageInfo.innerHTML = `
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
      $imageInfo.classList.add('open');
      $imageInfo
        .querySelector('.close')
        .addEventListener('click', () => closeModal());
      window.addEventListener(
        'keydown',
        e => e.key === 'Escape' && closeModal()
      );
      $imageInfo.addEventListener(
        'click',
        e => e.target.nodeName !== 'IMG' && closeModal()
      );
    } else {
      $imageInfo.classList.remove('open');
    }
  }
}

export default ImageInfo;
