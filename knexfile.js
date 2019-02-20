"use strict";

const args = require("@gourmet/server-args")();

let knexConfig;

if (args.stage === "local") {
  knexConfig = {
    client: "sqlite3",
    connection: {
      filename: `${__dirname}/.news-ssr.sqlite3`
    },
    useNullAsDefault: true
  };
} else {
  if (!process.env.PG_CONNECTION_STRING)
    throw Error("PostgreSQL connection string must be given via an environment variable PG_CONNECTION_STRING");

  knexConfig = {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING
  };
}

module.exports = knexConfig;
