import React, {Component} from "react";
import NewsPane from "./NewsPane";

export default class SavedView extends Component {
  static getInitialProps(gmctx) {
    return NewsPane.fetchArticles(gmctx, {category: "saved"});
  }

  render() {
    return (
      <NewsPane category="saved" {...this.props}/>
    );
  }
}
