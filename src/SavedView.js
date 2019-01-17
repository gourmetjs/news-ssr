import React, {Component} from "react";
import * as newsClient from "./newsClient";
import NewsList from "./components/NewsList";

export default class SavedView extends Component {
  static getInitialProps(gmctx) {
    return newsClient.getSaved(gmctx, {page: 1});
  }

  render() {
    const {gmctx} = this.props;
    return (
      <>
        <h5>
          Saved News Articles
        </h5>
        <NewsList
          articles={this.props.articles}
          fetch={page => newsClient.getSaved(gmctx, {page})}
          save={articles => newsClient.save(gmctx, {articles})}
          unsave={ids => newsClient.unsave(gmctx, {ids})}
        />
      </>
    );
  }
}
