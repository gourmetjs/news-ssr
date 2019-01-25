import React, {Component} from "react";
import {css} from "emotion";
import * as httpApi from "../utils/httpApi";
import Articles from "../components/Articles";
import LoadButton from "../components/LoadButton";
import ErrorBanner from "../components/ErrorBanner";

const cssFooter = css`
  padding: 1em 0;
  text-align: center;
`;

const cssEmpty = css`
  color: #ccc;
  font-size: 300%;
  padding: 4em 1em;
`;

const cssError = css`
  position: fixed;
  width: 25em;
  left: 2em;
  top: 1em;
  z-index: 100;
`;

function Empty() {
  return (
    <div className={cssEmpty}>
      <i className="fas fa-exclamation-circle"/>
      &nbsp;
      This list is empty
    </div>
  );
}

export default class NewsPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: props.articles,
      hasMore: props.hasMore,
      page: 1,
      lastError: null
    };
  }

  static fetchArticles(gmctx, {category="latest", page=1}) {
    return httpApi.get(gmctx, `/api/news?category=${category}&page=${page}`);
  }

  render() {
    const {articles, hasMore, lastError} = this.state;
    return (
      <>
        {lastError && (
          <ErrorBanner
            className={cssError}
            error={lastError}
            onClose={() => this.clearError()}
          />
        )}
        {articles && articles.length ? (
          <Articles
            articles={articles}
            saveArticles={articles => this.saveArticles(articles)}
            unsaveArticles={ids => this.unsaveArticles(ids)}
          />
        ) : (
          <Empty/>
        )}
        {hasMore ? (
          <div className={cssFooter}>
            <LoadButton label="Load more" onLoad={() => this.loadMore()}/>
          </div>
        ) : null}
      </>
    );
  }

  loadMore() {
    return NewsPane.fetchArticles(this.props.gmctx, {
      category: this.props.category,
      page: this.state.page + 1
    }).then(data => {
      this.setState({
        articles: this.state.articles.concat(data.articles),
        hasMore: data.hasMore,
        page: this.state.page + 1
      });
    }).catch(err => {
      this.setState({lastError: err});
      throw err;
    });
  }

  saveArticles(articles) {
    return httpApi.post(this.props.gmctx, "/api/news", {action: "save", articles}).then(({savedIds}) => {
      const articles = this.state.articles.map(article => {
        if (savedIds.indexOf(article.id) !== -1)
          return {...article, saved: true};
        else
          return article;
      });
      this.setState({articles});
    }).catch(err => {
      this.setState({lastError: err});
    });
  }
  
  unsaveArticles(ids) {
    return httpApi.post(this.props.gmctx, "/api/news", {action: "unsave", ids}).then(({deletedIds}) => {
      let articles;
      if (this.props.category === "latest") {
        articles = this.state.articles.map(article => {
          if (deletedIds.indexOf(article.id) !== -1)
            return {...article, saved: false};
          else
            return article;
        });
      } else if (this.props.category === "saved") {
        articles = this.state.articles.filter(article => {
          return deletedIds.indexOf(article.id) === -1;
        });
      }
      this.setState({articles});
    }).catch(err => {
      this.setState({lastError: err});
    });
  }

  clearError() {
    this.setState({lastError: null});
  }
}
