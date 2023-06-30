const { Router } = require("express");
const path = require("path");
const { loginHandler, signupHandler } = require("../utils/authHandler");
const router = Router();

router.post("/a/signup", async (req, res) => {
  let body = req.body;
  body.type = "admin";

  let response = await signupHandler(body);
  res.sendFile(path.join(__dirname, "../views/admin/login.html"));
});

router.post("/a/login", async (req, res) => {
  let body = req.body;
  body.type = "admin";

  let isValid = await loginHandler(body);
  if (isValid) {
    res.cookie("auth", isValid);
    res.redirect("/a/viewcentre");
  } else {
    res.send("Invalid Credentials");
  }
});

router.get("/a/logout", (req, res) => {
  res.clearCookie("auth");
  res.send("Logged Out");
});

router.post("/u/signup", async (req, res) => {
  let body = req.body;
  body.type = "user";
  let response = await signupHandler(body);
  res.sendFile(path.join(__dirname, "../views/user/login.html"));
});

router.post("/u/login", async (req, res) => {
  let body = req.body;
  body.type = "user";

  let isValid = await loginHandler(body);
  if (isValid) {
    res.cookie("auth", isValid);
    res.redirect("/u/bookvaccine");
  } else {
    res.send("Invalid Credentials");
  }
});

router.get("/u/logout", (req, res) => {
  res.clearCookie("auth");
  res.send("Logged Out");
});

module.exports = router;
