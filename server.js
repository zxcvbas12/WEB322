/********************************************************************************
 * WEB322 – Assignment 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Ji Ho Nam Student ID: 139817217 Date: Oct 24, 2023
 *
 * Published URL:
 *
 ********************************************************************************/
const path = require("path");
const legoData = require("./modules/legoSets");

const express = require("express");
const app = express();
const port = 8080;

app.use(express.static("public"));

legoData.Initialize().then(() => {
  // Define the route for the home page
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
  });

  app.get("/lego/sets", (req, res) => {
    const theme = req.query.theme;
    if (theme) {
      legoData
        .getSetsByTheme(theme)
        .then((sets) => {
          if (sets.length > 0) {
            res.json(sets);
          } else {
            res
              .status(404)
              .json({ error: "No sets found for the specified theme" });
          }
        })
        .catch((error) => {
          res.status(404).json({ error });
        });
    } else {
      legoData
        .getAllSets()
        .then((sets) => {
          res.json(sets);
        })
        .catch((error) => {
          res.status(404).json({ error });
        });
    }
  });

  app.get("/lego/sets/:set_num", async (req, res) => {
    const setNum = req.params.set_num;
    try {
      const set = await legoData.getSetByNum(setNum);
      if (set) {
        res.json(set);
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
  });

  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views/404.html"));
  });

  app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
