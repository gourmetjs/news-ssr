import React, {Component} from "react";
import ArticlesPane from "./ArticlesPane";

export default class SavedView extends Component {
  static getInitialProps(gmctx) {
    return ArticlesPane.fetchInitialArticles(gmctx, "saved");
  }

  render() {
    return (
      <ArticlesPane source="saved" {...this.props}/>
    );
  }
}
