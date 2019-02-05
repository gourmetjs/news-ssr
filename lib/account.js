"use strict";

const error = require("@gourmet/error");
const {knex, bcrypt, BCRYPT_ROUNDS, LOGIN_URL} = require("./env");

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
    }).returning("id");

    return {
      id: ids[0],
      username,
      name
    };
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT")
      throw error(USERNAME_EXISTS);
    throw err;
  }
}

async function verifyPassword({username, password}) {
  if (!username || !password)
    throw error(INVALID_PARAMETER);

  const data = await knex("users").where("username", username).select();
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
  if (req.session && req.session.userId) {
    knex("users").where("id", req.session.userId).select().then(data => {
      const user = data && data[0];
      if (user) {
        req.user = user;
        return next();
      } else {
        req.session.destroy();
        res.redirect(LOGIN_URL);
      }
    }).catch(next);
  } else {
    res.redirect(LOGIN_URL);
  }
}

function protectApi(req, res, next) {
  next();
}

exports.createUser = createUser;
exports.verifyPassword = verifyPassword;
exports.login = login;
exports.loginRequired = loginRequired;
exports.protectApi = protectApi;
