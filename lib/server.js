"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const serverArgs = require("@gourmet/server-args");
const gourmet = require("@gourmet/client-lib");
const news = require("./news");

const args = serverArgs({workDir: __dirname + "/.."});
const app = express();

app.use(bodyParser.json());
app.use(gourmet.middleware(args));

app.get("/api/news", (req, res, next) => {
  let {category="latest", page=1} = req.query;
  let p;

  page = parseInt(page, 10);

  if (category === "saved")
    p = news.getSaved({page});
  else
    p = news.getNews({page});

  p.then(data => {
    res.json(data);
  }).catch(next);
});

app.post("/api/news", (req, res, next) => {
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

app.get(["/login", "/signup"], (req, res) => {
  res.serve("public")
});

app.get("*", (req, res) => {
  res.serve("main");
});

app.use(gourmet.errorMiddleware());

app.listen(args.port, () => {
  console.log(`Server is listening on port ${args.port}`);
});
