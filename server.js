const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

// Enable JSON body parsing
app.use(bodyParser.json());

// Serve the static files from your 3D game
app.use("", express.static(path.join(__dirname, "./game-3d/dist")));

// Serve static files from the 2D game
app.use("/game-2d", express.static(path.join(__dirname, "./game-2d/www")));

// POST /score endpoint
app.post("/game-2d/score", (req, res) => {
  const { name, score } = req.body;

  // Read the existing scores
  const scoreboard = JSON.parse(
    fs.readFileSync("scoreboard.json", "utf-8") || "[]"
  );

  // Add the new score
  scoreboard.push({ name, score });

  // Write the new scores back to the file
  fs.writeFileSync("scoreboard.json", JSON.stringify(scoreboard));

  res.status(200).send("Score saved");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:3000/`);
  console.log(`http://localhost:3000/game-2d`);
});
