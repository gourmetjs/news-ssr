"use strict";

const crypto = require("crypto");
const got = require("got");
const {knex} = require("./env");

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_LANGUAGE = "en";
const NEWS_SOURCES = "cnn,bbc-news,business-insider,the-new-york-times";
const NEWS_PAGE_SIZE = 10;
const NEWS_LAST_PAGE = 1000 / NEWS_PAGE_SIZE;

if (!NEWS_API_KEY)
  throw Error("You must set your newsapi.org API key in environment variable NEWS_API_KEY");

function _getHash(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

async function getNews(userId, {page}) {
  const response = await got(NEWS_API_URL, {
    json: true,
    query: {
      language: NEWS_LANGUAGE,
      sources: NEWS_SOURCES,
      page,
      pageSize: NEWS_PAGE_SIZE,
      apiKey: NEWS_API_KEY
    }
  });
  
  return {
    hasMore: page < NEWS_LAST_PAGE,
    articles: response.body.articles.map(article => {
      const id = _getHash(article.url);
      return {
        id,
        url: article.url,
        image: article.urlToImage,
        title: article.title,
        description: article.description,
        source: article.source.name || article.source.id,
        publishedAt: article.publishedAt,
        saved: _saved.has(id)
      };
    })
  };
}

async function getSaved(userId, {page}) {
  const q = knex("saved").where({userId});
  const count = await q.clone().count();
  const offset = (page - 1) * NEWS_PAGE_SIZE;
  const data = await q.clone().select().offset(offset).limit(NEWS_PAGE_SIZE);

  return {
    hasMore: offset + data.length < count,
    articles: data.map(item => ({
      ...item.article,
      id: item.articleId,
      saved: true
    }))
  };
}

function save(userId, {articles}) {
  return knex("save").insert(articles.map(article => {
    const {articleId, }
    userId,
    articleId: article.id,

  }));
  return Promise.resolve().then(() => {
    return {
      savedIds: articles.filter(article => {
        if (!_saved.has(article.id)) {
          _saved.set(article.id, article);
          return true;
        }
      }).map(article => article.id)
    };
  });
}

function unsave(userId, {ids}) {
  return Promise.resolve().then(() => {
    return {
      deletedIds: ids.filter(id => {
        if (_saved.has(id)) {
          _saved.delete(id);
          return true;
        }
      })
    };
  });
}

exports.getNews = getNews;
exports.getSaved = getSaved;
exports.save = save;
exports.unsave = unsave;
