const { readcDB, writecDB } = require("./centre/centreDBHandler");

async function addcentre(data) {
  let centres = await readcDB();

  for (let centre in centres) {
    if (data.code === centre.code) return "Centre already exists";
  }
  data.bookings = [];
  centres.push(data);

  await writecDB(JSON.stringify(centres));
  return "Centre added successfully";
}

async function getcentres() {
  let centres = await readcDB();
  return centres;
}

module.exports = { addcentre, getcentres };
