"use strict";

const error = require("@gourmet/error");
const bcrypt = require("bcrypt");
const knex = require("./knex");

// https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds
const BCRYPT_ROUNDS = 12;

const LOGIN_URL = "/login";

const INVALID_PARAMETER = {
  message: "Invalid parameter",
  code: "INVALID_PARAMETER",
  statusCode: 400
};

const USERNAME_EXISTS = {
  message: "Username already exists",
  code: "USERNAME_EXISTS",
  statusCode: 400
};

const INVALID_CREDENTIAL = {
  message: "Invalid username or password",
  code: "INVALID_CREDENTIAL",
  statusCode: 400
};

const ACCESS_DENIED = {
  message: "Invalid session ID, API access denied",
  code: "ACCESS_DENIED",
  statusCode: 403
};

function _loadUser(userId) {
  if (userId) {
    return knex.select().from("users").where("id", userId).then(data => {
      return data && data[0];
    });
  } else {
    return Promise.resolve(null);
  }
}

async function createUser({name, username, password}) {
  name = name.trim();
  username = username.toLowerCase().trim();
  password = password.trim();

  if (!name || !username || !password)
    throw error(INVALID_PARAMETER);

  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  try {
    const ids = await knex("users").insert({
      name,
      username,
      password: hash
    }, "id");

    return {
      id: ids[0],
      username,
      name
    };
  } catch (err) {
    if ((knex.client.dialect === "sqlite3" && err.code === "SQLITE_CONSTRAINT") ||
        (knex.client.dialect === "postgresql" && err.code === "23505")) {
      throw error(USERNAME_EXISTS);
    }
    throw err;
  }
}

async function verifyPassword({username, password}) {
  if (!username || !password)
    throw error(INVALID_PARAMETER);

  const data = await knex.select().from("users").where("username", username);
  const user = data && data[0];

  if (!user)
    throw error(INVALID_CREDENTIAL);

  const ok = await bcrypt.compare(password, user.password);

  if (!ok)
    throw error(INVALID_CREDENTIAL);

  return {
    id: user.id,
    username: user.username,
    name: user.name
  };
}

// Set the user as logged in the current session.
function login(req, user) {
  req.session.userId = user.id;
  req.user = user;
}

function loginRequired(req, res, next) {
  _loadUser(req.session && req.session.userId).then(user => {
    if (user) {
      req.user = user;
      return next();
    } else {
      req.session.destroy();
      res.redirect(LOGIN_URL);
    }
  }).catch(next);
}

function protectApi(req, res, next) {
  _loadUser(req.session && req.session.userId).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      next(error(ACCESS_DENIED));
    }
  }).catch(next);
}

exports.createUser = createUser;
exports.verifyPassword = verifyPassword;
exports.login = login;
exports.loginRequired = loginRequired;
exports.protectApi = protectApi;
