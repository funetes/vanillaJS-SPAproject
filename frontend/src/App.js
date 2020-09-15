console.log('app is running!');

class App {
  $target = null;
  data = [];
  keyword = '';
  page = 2;
  constructor($target) {
    this.$target = $target;
    this.darkmodeCheckBox = new DarkmodeCheckBox({
      $target,
    });
    this.loading = new Loading({ $target });

    this.header = new Header({
      $target,
      onSearch: keyword => {
        this.loading.setState({ show: true });
        this.keyword = keyword;
        api.fetchCats(keyword).then(({ data }) => {
          this.loading.setState({ show: false });
          this.setState(data);
        });
      },
      onClick: () => {
        this.loading.setState({ show: true });
        api.randomCats().then(({ data }) => {
          this.loading.setState({ show: false });
          this.setState(data);
        });
      },
    });
    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: ({ id }) => this.imageInfo.showDetail(id),
      onNextPage: () => {
        this.loading.setState({ show: true });
        api.fetchCatsPage(this.keyword, this.page).then(({ data }) => {
          const newData = this.data.concat(data);
          this.loading.setState({ show: false });
          this.page = this.page + 1;
          this.setState(newData);
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
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
