import React, {Component} from "react";
import ArticlesPane from "./ArticlesPane";

export default class SavedRoute extends Component {
  static getInitialProps(gmctx) {
    return ArticlesPane.fetchInitialArticles("saved", gmctx);
  }

  render() {
    return (
      <ArticlesPane source="saved" {...this.props}/>
    );
  }
}
