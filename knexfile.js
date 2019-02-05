const getKnexConfig = require("./lib/knex_config");

module.exports = {
  development: getKnexConfig("local")
};
