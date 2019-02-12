"use strict";

const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const bodyParser = require("body-parser");
const gourmet = require("@gourmet/client-lib");
const {args, knex, SESSION_COOKIE_NAME, MAIN_URL, LOGIN_URL} = require("./env");
const account = require("./account");
const news = require("./news");

const app = express();

app.use(session({
  name: SESSION_COOKIE_NAME,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
  },
  secret: "uWduZ4lSD8hwIIISBq650RZFjY8uIWds5Z6u7hjJ",
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({knex})
}));

app.use(bodyParser.json());
app.use(gourmet.middleware(args));

app.post("/api/signup", (req, res, next) => {
  account.createUser(req.body).then(user => {
    account.login(req, user);
    res.json({user, redirectTo: MAIN_URL});
  }).catch(next);
});

app.post("/api/login", (req, res, next) => {
  account.verifyPassword(req.body).then(user => {
    account.login(req, user);
    res.json({user, redirectTo: MAIN_URL});
  }).catch(next);
});

app.post("/api/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.clearCookie(SESSION_COOKIE_NAME);
    res.json({redirectTo: LOGIN_URL});
  });
});

app.get("/api/news", account.protectApi, (req, res, next) => {
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

app.post("/api/news", account.protectApi, (req, res, next) => {
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

app.get(["/", "/saved"], account.loginRequired, (req, res) => {
  res.serve("main", {user: req.user});
});

app.use(gourmet.errorMiddleware());

app.listen(args.port, () => {
  console.log(`Server is listening on port ${args.port}`);
});
