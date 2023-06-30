const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

const { adminAuthHandler, userAuthHandler } = require("./utils/authHandler");

const PORT = process.env.PORT || 3000;

const app = express();
const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.use("/auth", authRoute);

app.get("/u/signup", (req, res) => {
  res.sendFile(__dirname + "/views/user/signup.html");
});

app.get("/u/logout", (req, res) => {
  res.clearCookie("auth");
  res.send("Logged Out");
});

app.get("/u/login", (req, res) => {
  res.sendFile(__dirname + "/views/user/login.html");
});

app.get("/a/signup", (req, res) => {
  res.sendFile(__dirname + "/views/admin/signup.html");
});

app.get("/a/logout", (req, res) => {
  res.clearCookie("auth");
  res.send("Logged Out");
});

app.get("/a/login", (req, res) => {
  res.sendFile(__dirname + "/views/admin/login.html");
});

app.use("/a", adminAuthHandler, adminRoute);
app.use("/u", userAuthHandler, userRoute);

app.use((req, res) => {
  res.send("Invalid Path 404");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
