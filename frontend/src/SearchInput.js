const TEMPLATE = '<input type="text">';
import SearchKeywords from './SearchKeywords.js';
import SearchOption from './SearchOption.js';
class SearchInput {
  data = {
    limit: 50,
  };
  constructor({ $parentTarget, $target, onSearch }) {
    this.$searchInput = document.createElement('input');
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.className = 'SearchInput';
    this.onSearch = onSearch;
    $target.appendChild(this.$searchInput);

    this.$searchOption = new SearchOption({
      $target,
      onLimitChange: this.onLimitChange,
    });
    // 검색어
    this.searchKeywords = new SearchKeywords({ $parentTarget, onSearch });

    this.$searchInput.addEventListener('keypress', e => {
      const {
        key,
        target: { value },
      } = e;
      if (key === 'Enter') {
        this.searchKeywords.add(value);
        this.onSearch(value, this.data.limit);
      }
    });

    this.$searchInput.addEventListener('mouseover', () => {
      this.searchKeywords.$searchKeywordsList.style.display = 'flex';
    });
    this.$searchInput.addEventListener('mouseleave', () => {
      this.searchKeywords.$searchKeywordsList.style.display = 'none';
    });
    this.searchInit();
  }
  onLimitChange = limit => {
    this.setState({
      limit,
    });
  };
  searchInit() {
    const lastestKeyword = this.searchKeywords.getKeywords();
    this.onSearch(lastestKeyword[0]);
  }

  setState(nextData) {
    this.data = nextData;
  }
}

export default SearchInput;
