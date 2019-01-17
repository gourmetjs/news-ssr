import React, {Component} from "react";
import * as newsClient from "./newsClient";
import NewsList from "./components/NewsList";

export default class NewsView extends Component {
  static getInitialProps(gmctx) {
    return NewsList.getInitialProps(gmctx);
  }

  render() {
    const {gmctx} = this.props;
    return (
      <>
        <h5>
          Latest News Headlines
        </h5>
        <NewsList
          articles={this.props.articles}
          hasMore={this.props.hasMore}
          fetch={page => newsClient.getNews(gmctx, {page})}
          save={articles => newsClient.save(gmctx, {articles})}
          unsave={ids => newsClient.unsave(gmctx, {ids})}
        />
      </>
    );
  }
}
