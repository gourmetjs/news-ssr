"use strict";

const express = require("express");
const gourmet = require("@gourmet/client-lib");
const serverArgs = require("@gourmet/server-args");
const bodyParser = require("body-parser");

const args = serverArgs({workDir: __dirname + "/.."});
const app = express();

app.use(bodyParser.json());
app.use(gourmet.middleware(args));

app.post("/api/signup", (req, res) => {
  console.log("/api/signup", req.body);
  res.json({});
});

app.post("/api/login", (req, res) => {
  console.log("/api/login", req.body);
  res.json({});
});

app.get(["/login", "/signup"], (req, res) => {
  res.serve("public");
});

app.get(["/", "/saved"], (req, res) => {
  res.serve("main");
});

app.use(gourmet.errorMiddleware());

app.listen(args.port, () => {
  console.log(`Server is listening on port ${args.port}`);
});
