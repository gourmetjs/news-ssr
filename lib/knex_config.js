"use strict";

module.exports = stage => {
  if (stage === "local") {
    return {
      client: "sqlite3",
      connection: {
        filename: `${__dirname}/../.news-ssr.sqlite3`
      }
    };
  } else {
    throw Error(`Please add a Knex configuration for stage '${stage}'`);
  }
};
