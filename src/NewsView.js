import React, {Component} from "react";
import newsClient from "./newsClient";
import NewsList from "../components/NewsList";

export default class NewsView extends Component {
  static getInitialProps() {
    return newsClient.getNews({page: 1});
  }

  render() {
    return (
      <>
        <h5>
          Latest News Headlines
        </h5>
        <NewsList
          data={this.props.articles}
          fetch={page => newsClient.getNews({page})}
          save={articles => newsClient.save({articles})}
          unsave={ids => newsClient.usave({ids})}
        />
      </>
    );
  }
}
