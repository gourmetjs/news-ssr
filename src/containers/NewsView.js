import React, {Component} from "react";
import NewsPane from "./NewsPane";

export default class NewsView extends Component {
  static getInitialProps(gmctx) {
    return NewsPane.fetchNews(gmctx);
  }

  render() {
    return (
      <NewsPane source="news" {...this.props}/>
    );
  }
}
