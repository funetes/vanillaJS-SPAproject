class ImageInfo {
  $imageInfo = null;
  data = null;

  // <div id="App">
  //  <input placeholder.../>
  //  <div class='SearchResult'>
  //    <div class="item"> <= onClick
  //      <img src=${cat.url} alt=${cat.name} />
  //    </div>
  //    <div class="item"> <= onClick
  //      <img src=${cat.url} alt=${cat.name} />
  //    </div>
  //        ...   <= onClick
  //  </div>
  //  <div class='ImageInfo'>
  //    <div class="content-wrapper">
  //      <div class="title">
  //        <span>${name}</span>
  //          <div class="close">x</div>
  //      </div>
  //      <img src="${url}" alt="${name}"/>
  //      <div class="description">
  //        <div>성격: ${temperament}</div>
  //        <div>태생: ${origin}</div>
  //      </div>
  //    </div>`;
  //  </div> // this is modal
  //</div> // app

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

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
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}
