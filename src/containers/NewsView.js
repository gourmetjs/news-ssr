import React, {Component} from "react";
import ArticlesPane from "./ArticlesPane";

export default class NewsView extends Component {
  static getInitialProps(gmctx) {
    return ArticlesPane.fetchInitialArticles("news", gmctx);
  }

  render() {
    return (
      <ArticlesPane source="news" {...this.props}/>
    );
  }
}
