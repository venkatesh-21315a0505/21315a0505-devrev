const { Router } = require("express");
const path = require("path");
const { getcentres } = require("../utils/centreHandler");
const { writecDB } = require("../utils/centre/centreDBHandler");
const router = Router();

router.get("/", async (req, res) => {
  const locations = [];
  res.render(path.join(__dirname, "../views/user/bookVaccine"), { locations });
});

router.get("/bookvaccine", async (req, res) => {
  try {
    const centres = await getcentres();
    const locations = [];

    for (let centre of centres) {
      locations.push(
        `${centre.code} ${centre.name} Operates from: ${centre.from} to: ${centre.to}`
      );
    }

    res.render("user/bookVaccine", { locations });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/bookvaccine", async (req, res) => {
  try {
    let centres = await getcentres();
    let pdata = req.body;

    let locationCode = pdata.vaccinelocation.substr(
      0,
      pdata.vaccinelocation.indexOf(" ")
    );
    let date = pdata.date;

    delete pdata.vaccinelocation;
    delete pdata.date;

    for (let centre of centres) {
      if (centre.code == locationCode) {
        let bookings = centre.bookings;
        let reqDateBookings = bookings[date];
        if (!reqDateBookings) {
          centre.bookings[date] = [pdata];
          try {
            let resp = await writecDB(JSON.stringify(centres));
            res.send(
              `Slot booked sucessfully : ${JSON.stringify(
                req.body
              )} Date: ${date}`
            );
            break;
          } catch (err) {
            res.send("Internal Server error -1");
            break;
          }
        } else {
          if (reqDateBookings.length < 10) {
            centre.bookings[date].push(pdata);
            try {
              let resp = await writecDB(JSON.stringify(centres));
              res.send(
                `Slot booked sucessfully : ${JSON.stringify(
                  req.body
                )} Date: ${date}`
              );
              break;
            } catch (err) {
              res.send("Internal Server error -1");
              break;
            }
          } else {
            res.send("No. bookings available today try another date");
            break;
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.send("Internal Server Error - 3");
  }
});
module.exports = router;
