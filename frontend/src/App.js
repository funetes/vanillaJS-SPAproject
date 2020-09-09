console.log('app is running!');

class App {
  $target = null;
  data = [];
  constructor($target) {
    this.$target = $target;
    this.darkmodeCheckBox = new DarkmodeCheckBox({
      $target,
    });
    this.loading = new Loading({ $target });

    this.header = new Header({ $target });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.loading.setState({ show: true });
        api.fetchCats(keyword).then(({ data }) => {
          this.loading.setState({ show: false });
          this.setState(data);
        });
      },
      $wrapper: this.header,
    });

    this.randomButton = new RandomButton({
      $target,
      onClick: () => {
        this.loading.setState({ show: true });
        api.randomCats().then(({ data }) => {
          this.loading.setState({ show: false });
          this.setState(data);
        });
      },
      $wrapper: this.header,
    });

    //id, url, name
    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.showDetail(image.id);
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
