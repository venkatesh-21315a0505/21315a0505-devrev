const crypto = require("crypto");
const { readVault, writeVault } = require("./vault/vaultHandler");

async function signupHandler(credentials) {
  let vaultData = await readVault();

  for (let user of vaultData) {
    if (user.username == credentials.username) {
      return "User already exists";
    }
  }
  vaultData.push(credentials);
  await writeVault(JSON.stringify(vaultData));

  return "Signin Successful";
}

async function loginHandler(credentials) {
  let vaultData = await readVault();
  let cookie = false;

  for (let user of vaultData) {
    if (
      user.username == credentials.username &&
      user.password == credentials.password
    ) {
      user["cookie"] = crypto.randomBytes(24).toString("hex");
      cookie = user["cookie"];
      break;
    }
  }
  await writeVault(JSON.stringify(vaultData));
  return cookie;
}

async function adminAuthHandler(req, res, next) {
  let vaultData = await readVault();
  let cookie = req.cookies["auth"];

  if (!cookie) {
    res.send("Signin to access this page");
    return;
  }

  for (let user of vaultData) {
    if (user.cookie == cookie && user.type == "admin") {
      next();
      return;
    }
  }
  res.send("Not Authorized");
}

async function userAuthHandler(req, res, next) {
  let vaultData = await readVault();
  let cookie = req.cookies["auth"];

  if (!cookie) {
    res.send("Signin to access this page");
    return;
  }

  for (let user of vaultData) {
    if (user.cookie == cookie && user.type == "user") {
      next();
      return;
    }
  }
  res.send("Not Authorized");
}

module.exports = {
  loginHandler,
  signupHandler,
  adminAuthHandler,
  userAuthHandler,
};
