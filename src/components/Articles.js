import React from "react";
import Article from "./Article";

export default function Articles({articles, saveArticle, unsaveArticle}) {
  return (
    <div>
      {articles.map(article => (
        <Article
          article={article}
          saveArticle={saveArticle}
          unsaveArticle={unsaveArticle}
          key={article.id}
        />
      ))}
    </div>
  );
}
