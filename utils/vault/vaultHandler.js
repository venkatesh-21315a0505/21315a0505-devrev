const fs = require("fs");
const path = require("path");

async function readVault() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "vault.json"),
      { encoding: "utf-8" },
      (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      }
    );
  });
}

async function writeVault(vaultData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, "vault.json"), vaultData, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

module.exports = { readVault, writeVault };
