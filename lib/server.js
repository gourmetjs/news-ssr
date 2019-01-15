"use strict";

const express = require("express");
const news = require("./news");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/api/news", (req, res, next) => {
  news.getNews({page: parseInt(req.query.page || 1, 10)}).then(data => {
    res.json(data);
  }).catch(next);
});

app.get("/api/saved", (req, res, next) => {
  news.getSaved({page: parseInt(req.query.page || 1, 10)}).then(data => {
    res.json(data);
  }).catch(next);
});

app.post("/api/saved", (req, res, next) => {
  news.save(req.body).then(data => {
    res.json(data);
  }).catch(next);
});

app.delete("/api/saved/", (req, res, next) => {
  news.unsave(req.body).then(data => {
    res.json(data);
  }).catch(next);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
