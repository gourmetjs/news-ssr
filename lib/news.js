"use strict";

const crypto = require("crypto");
const got = require("got");

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_LANGUAGE = "en";
const NEWS_SOURCES = "cnn,bbc-news,business-insider,the-new-york-times";
const NEWS_PAGE_SIZE = 20;
const NEWS_LAST_PAGE = 1000 / NEWS_PAGE_SIZE;

if (!NEWS_API_KEY)
  throw Error("You must set your newsapi.org API key in environment variable NEWS_API_KEY");

const _saved = new Map();

function _getHash(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

function getNews({page}) {
  return got(NEWS_API_URL, {
    json: true,
    query: {
      language: NEWS_LANGUAGE,
      sources: NEWS_SOURCES,
      page,
      pageSize: NEWS_PAGE_SIZE,
      apiKey: NEWS_API_KEY
    }
  }).then(response => {
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
  });
}

function getSaved({page}) {
  return Promise.resolve().then(() => {
    const saved = Array.from(_saved.values()).reverse();
    const sidx = (page - 1) * NEWS_PAGE_SIZE;
    const eidx = sidx + NEWS_PAGE_SIZE;
  
    return {
      hasMore: eidx < saved.length,
      articles: saved.slice(sidx, eidx).map(article => {
        return {...article, saved: true};
      })
    };
  });
}

function save({articles}) {
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

function unsave({ids}) {
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
