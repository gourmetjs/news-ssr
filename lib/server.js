const express = require("express");
const got = require("got");

const PORT = process.env.PORT || 3000;
const NEWS_API_URL = "https://newsapi.org/v2/everything";
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_LANGUAGE = "en";
const NEWS_SOURCES = "cnn,bbc-news,business-insider,the-new-york-times";
const NEWS_PAGE_SIZE = 20;

if (!NEWS_API_KEY)
  throw Error("You must set your newsapi.org API key in environment variable NEWS_API_KEY");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/api/news", (req, res, next) => {
  got(NEWS_API_URL, {
    json: true,
    query: {
      language: NEWS_LANGUAGE,
      sources: NEWS_SOURCES,
      page: req.query.page || 1,
      pageSize: NEWS_PAGE_SIZE,
      apiKey: NEWS_API_KEY
    }
  }).then(response => {
    const data = updateFetchedData(response.body);
    res.json(data);
  }).catch(next);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
