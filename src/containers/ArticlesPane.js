import React, {Component} from "react";
import {css} from "emotion";
import httpApi from "../utils/httpApi";
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

export default class ArticlesPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: props.articles,
      hasMore: props.hasMore,
      page: 1,
      lastError: null
    };
  }

  // source = "news" or "saved"
  static fetchInitialArticles(gmctx, source) {
    return httpApi(`/api/${source}`, {method: "GET"}, gmctx);
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
            saveArticle={article => this.saveArticle(article)}
            unsaveArticle={id => this.unsaveArticle(id)}
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
    const {source} = this.props;
    const {page, articles} = this.state;

    return httpApi(`/api/${source}?page=${page + 1}`).then(data => {
      this.setState({
        articles: articles.concat(data.articles),
        hasMore: data.hasMore,
        page: page + 1
      });
    }).catch(err => {
      this.setState({lastError: err});
      throw err;
    });
  }

  saveArticle(article) {
    return httpApi("/api/saved", {
      method: "POST",
      body: {article}
    }).then(() => {
      const articles = this.state.articles.map(a => {
        if (a.id === article.id)
          return {...a, saved: true};
        else
          return a;
      });
      this.setState({articles});
    }).catch(err => {
      this.setState({lastError: err});
    });
  }
  
  unsaveArticle(articleId) {
    return httpApi(`/api/saved/${articleId}`, {method: "DELETE"}).then(() => {
      const {source} = this.props;
      let articles;
      if (source === "news") {
        articles = this.state.articles.map(a => {
          if (a.id === articleId)
            return {...a, saved: false};
          else
            return a;
        });
      } else {
        articles = this.state.articles.filter(a => {
          return a.id !== articleId;
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
