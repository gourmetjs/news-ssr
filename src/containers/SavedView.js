import React, {Component} from "react";
import NewsPane from "./NewsPane";

export default class SavedView extends Component {
  static getInitialProps(gmctx) {
    return NewsPane.fetchSaved(gmctx);
  }

  render() {
    return (
      <NewsPane source="saved" {...this.props}/>
    );
  }
}
