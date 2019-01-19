import React, {Component} from "react";
import Article from "./Article";

export default class Articles extends Component {
  render() {
    const {articles, saveArticles, unsaveArticles} = this.props;
    return (
      <div>
        {articles.map(article => (
          <Article
            article={article}
            saveArticles={saveArticles}
            unsaveArticles={unsaveArticles}
            key={article.id}
          />
        ))}
      </div>
    );
  }
}
