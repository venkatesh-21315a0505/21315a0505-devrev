const fs = require("fs");
const path = require("path");

async function readcDB() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "centreDB.json"),
      { encoding: "utf-8" },
      (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      }
    );
  });
}

async function writecDB(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, "centreDB.json"), data, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

module.exports = { readcDB, writecDB };
