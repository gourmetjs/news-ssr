import React from "react";

export default class NewsView extends Component {
  static getInitialProps(gmctx) {
    return ArticlesPane.fetchInitialArticles("news", gmctx);
  }

  render() {
    return (
      <ArticlesPane source="news" {...this.props}/>
    );
  }
}
