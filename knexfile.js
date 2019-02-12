"use strict";

const args = require("@gourmet/server-args")();

let knexConfig;

if (args.stage === "local") {
  knexConfig = {
    client: "sqlite3",
    connection: {
      filename: `${__dirname}/.news-ssr.sqlite3`
    }
  };
} else if (args.stage === "dev") {
  if (!process.env.PG_CONNECTION_STRING)
    throw Error("PostgreSQL connection string must be given via an environment variable PG_CONNECTION_STRING");

  knexConfig = {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING
  };
} else {
  throw Error(`Please add a Knex configuration for stage '${args.stage}'`);
}

module.exports = knexConfig;
