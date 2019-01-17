import React, {Component} from "react";
import Articles from "./components/Articles";
import MoreButton from "./components/MoreButton";

const cssFooter = css`
  padding: 1em 0;
  text-align: center;
`;

export default class NewsList extends Component {
  static getInitialProps(gmctx) {
    return newsClient.getNews(gmctx, {page: 1});
  }

  state = {
    articles: this.props.articles || [],
    hasMore: this.props.hasMore,
    page: 1
  };

  render() {
    const {articles} = this.state;
    return (
      <div>
        <Articles articles={articles}/>
        {hasMore ? (
          <div className={cssFooter}>
            <MoreButton label="Load more" onLoad={() => this._loadMore()}/>
          </div>
        ) : null}
      </div>
    );
  }

  _loadMore() {
    const newsData = this.props.newsData;
    const len = this.state.data.articles.length;
    const size = newsData.pageSize;
    let page = Math.floor(len / size) + 1;
    const endPage = page + (len % size ? 2 : 1);

    return promiseRepeat(() => {
      if (page >= endPage)
        return true;
      return newsData.fetch(page++).then(data => {
        this._updateArticles(data, (des, src) => {
          let added = 0, item;
          while ((item = src.shift())) {
            if (!des.find(d => d.url === item.url)) {
              des.push(item);
              added++;
            }
          }
          return added;
        });
      });
    });
  }
}
