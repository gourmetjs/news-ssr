import React from "react";
import Article from "./Article";

export default function Articles({articles, saveArticles, unsaveArticles}) {
  return (
    <div>
      {articles.map(article => (
        <Article
          article={article}
          saveArticles={saveArticles}
          unsaveArticles={unsaveArticles}
          key={article.id}
        />
      ))}
    </div>
  );
}
