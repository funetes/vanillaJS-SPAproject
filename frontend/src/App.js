console.log('app is running!');
import DarkmodeCheckBox from './DarkmodeCheckBox.js';
import Loading from './Loading.js';
import Header from './Header.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import Banner from './Banner.js';
import { api } from './api.js';
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
      onSearch: this.onSearch,
      onClick: async () => {
        this.loading.setState({ show: true });
        const { data } = await api.randomCats();
        this.loading.setState({ show: false });
        this.setState(data);
      },
    });
    this.banner = new Banner({ $target });
    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: ({ id }) => this.imageInfo.showDetail(id),
      onNextPage: this.onNextPage,
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  onSearch = async (keyword, limit) => {
    this.loading.setState({ show: true });
    this.keyword = keyword; // setState로 변경해줘야함
    const { data } = await api.fetchCats(keyword, limit);
    this.loading.setState({ show: false });
    this.setState(data);
  };

  onNextPage = async () => {
    this.loading.setState({ show: true });
    const { data } = await api.fetchCatsPage(this.keyword, this.page);
    const newData = this.data.concat(data);
    this.loading.setState({ show: false });
    this.page = this.page + 1;
    this.setState(newData);
  };

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}

export default App;
