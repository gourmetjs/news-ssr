import React, {Component} from "react";
import newsClient from "./newsClient";
import NewsList from "../components/NewsList";

export default class SavedView extends Component {
  static getInitialProps() {
    return newsClient.getSaved({page: 1});
  }

  render() {
    return (
      <>
        <h5>
          Saved News Articles
        </h5>
        <NewsList
          data={this.props.articles}
          fetch={page => newsClient.getSaved({page})}
          save={articles => newsClient.save({articles})}
          unsave={ids => newsClient.usave({ids})}
        />
      </>
    );
  }
}
