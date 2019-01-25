import React, {Component} from "react";
import {css} from "emotion";
import BookmarkButton from "./BookmarkButton";

const cssArticle = css`
  position: relative;
  padding: 24px 16px;
  border-bottom: 1px solid #dee2e6;
`;

const cssImage = css`
  max-width: 256px;
  max-height: 256px;
`;

const cssSource = css`
  margin-top: 6px;
  font-size: 85%;
`;

const cssTitle = css`
  margin: 0 14px 10px 0;
`;

const cssBookmark = css`
  position: absolute;
  top: 24px;
  right: 0;
`;

export default function Article({article, saveArticles, unsaveArticles}) {
  const publishedAt = new Date(article.publishedAt).toLocaleString("en-US");
  return (
    <div className={"media " + cssArticle}>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <img className={`${cssImage} img-thumbnail mr-3`} src={article.image}/>
      </a>
      <div className="media-body">
        <h5 className={cssTitle}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h5>
        {article.description}
        <div className={cssSource}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.source} - {publishedAt}
          </a>
        </div>
      </div>
      <BookmarkButton
        className={cssBookmark}
        saved={article.saved}
        onClick={() => {
          if (article.saved)
            unsaveArticles([article.id]);
          else
            saveArticles([article]);
        }}
      />
    </div>
  );
}
