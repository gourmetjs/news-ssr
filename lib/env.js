"use strict";

const serverArgs = require("@gourmet/server-args");
const createKnex = require("knex");
const bcrypt = require("bcryptjs");   // or "bcrypt" for C++ binding
const knexConfig = require("../knexfile.js");

exports.args = serverArgs({workDir: __dirname + "/.."});
exports.knex = createKnex(knexConfig);
exports.bcrypt = bcrypt;
exports.BCRYPT_ROUNDS = 12;
exports.SESSION_COOKIE_NAME = "session_id";
exports.LOGIN_URL = "/login";
exports.SIGNUP_URL = "/signup";
exports.MAIN_URL = "/";
