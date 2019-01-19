import React, {Component} from "react";
import NewsPane from "./NewsPane";

export default class NewsView extends Component {
  static getInitialProps(gmctx) {
    return NewsPane.fetchArticles(gmctx, {category: "latest"});
  }

  render() {
    return (
      <NewsPane category="latest" {...this.props}/>
    );
  }
}
