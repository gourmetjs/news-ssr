"use strict";

const express = require("express");
const serverArgs = require("@gourmet/server-args");
const gourmet = require("@gourmet/client-lib");
const news = require("./news");

const args = serverArgs({workDir: __dirname + "/.."});
const app = express();

app.use(gourmet.middleware(args));

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
  return Promise.resolve().then(() => {
    if (req.body.action === "save")
      return news.save(req.body);
    else if (req.body.action === "unsave")
      return news.unsave(req.body);
    else
      throw Error("Unknown action for the saved news");
  }).then(data => {
    res.json(data);
  }).catch(next);
});

app.get("*", (req, res) => {
  res.serve("main");
});

app.use(gourmet.errorMiddleware());

app.listen(args.port, () => {
  console.log(`Server is listening on port ${args.port}`);
});
