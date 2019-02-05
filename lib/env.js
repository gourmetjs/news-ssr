"use strict";

const serverArgs = require("@gourmet/server-args");
const createKnex = require("knex");
const bcrypt = require("bcryptjs");   // or "bcrypt" for C++ binding
const getKnexConfig = require("./knex_config");

exports.args = serverArgs({workDir: __dirname + "/.."});
exports.knex = createKnex(getKnexConfig(exports.args.stage));
exports.bcrypt = bcrypt;
exports.BCRYPT_ROUNDS = 12;
exports.LOGIN_URL = "/login";
exports.SIGNUP_URL = "/signup";
exports.MAIN_URL = "/";
