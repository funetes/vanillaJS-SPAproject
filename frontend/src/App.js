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

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.loading.setState({ show: true });
        api.fetchCats(keyword).then(({ data }) => {
          this.loading.setState({ show: false });
          this.setState(data);
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
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
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
