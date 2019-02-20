"use strict";

const crypto = require("crypto");
const got = require("got");
const knex = require("./knex");

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

async function getNews(userId, page=1) {
  const res = await got(NEWS_API_URL, {
    json: true,
    query: {
      language: NEWS_LANGUAGE,
      sources: NEWS_SOURCES,
      page,
      pageSize: NEWS_PAGE_SIZE,
      apiKey: NEWS_API_KEY
    }
  });
  const articles = res.body.articles.map(a => ({
    id: _getHash(a.url),
    url: a.url,
    image: a.urlToImage,
    title: a.title,
    description: a.description,
    source: a.source.name || a.source.id,
    publishedAt: a.publishedAt
  }));
  const ids = articles.map(a => a.id);
  const savedIds = await knex.select("articleId").from("saved")
                             .where("userId", userId)
                             .andWhere("articleId", "in", ids)
                             .then(rows => rows.map(rows => rows.articleId));
  return {
    hasMore: page < NEWS_LAST_PAGE,
    articles: articles.map(a => ({
      ...a,
      saved: savedIds.indexOf(a.id) !== -1
    }))
  };
}

async function getSaved(userId, page=1) {
  const q = knex.select().from("saved").where({userId});
  const count = (await q.clone().count("* as count"))[0].count; // query returns `[{count: n}]`
  const offset = (page - 1) * NEWS_PAGE_SIZE;
  const data = await q.clone().orderBy("id", "desc").offset(offset).limit(NEWS_PAGE_SIZE);

  return {
    hasMore: offset + data.length < count,
    articles: data.map(item => ({
      ...(JSON.parse(item.article)),
      id: item.articleId,
      saved: true
    }))
  };
}

async function save(userId, article) {
  const {id, saved, ...a} = article;

  await knex.insert({
    userId,
    articleId: id,
    article: JSON.stringify(a)
  }).into("saved");

  return true;
}

async function unsave(userId, articleId) {
  await knex.delete().from("saved").where({
    userId,
    articleId
  });

  return true;
}

exports.getNews = getNews;
exports.getSaved = getSaved;
exports.save = save;
exports.unsave = unsave;
