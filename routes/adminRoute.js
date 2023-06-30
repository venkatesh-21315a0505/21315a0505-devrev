const { Router } = require("express");
const path = require("path");
const { addcentre, getcentres } = require("../utils/centreHandler");
const { writecDB } = require("../utils/centre/centreDBHandler");

const router = Router();

router.get("/", (req, res) => {
  res.send("Admin");
});

router.get("/addcentre", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin/addcentre.html"));
});

router.post("/addcentre", async (req, res) => {
  let response = await addcentre(req.body);
  res.send(response);
});

router.get("/viewcentre", async (req, res) => {
  try {
    const centres = await getcentres();
    res.render(path.join(__dirname, "../views/admin/viewcentre.ejs"), {
      centres: centres,
    });
  } catch (err) {
    res.send("Internal server Error");
  }
});

router.post("/delete/:code", async (req, res) => {
  try {
    const centres = await getcentres();
    const code = req.params.code;
    let uc = [];
    for (let center of centres) {
      if (center.code !== code) {
        uc.push(center);
      }
    }
    let resp = await writecDB(JSON.stringify(uc));
    res.redirect("/a/viewcentre");
  } catch (err) {
    console.log(err);
    res.send("Internal Server Error");
  }
});
module.exports = router;
