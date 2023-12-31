const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

// Enable JSON body parsing
app.use(bodyParser.json());

// Serve the static files from your 3D game
app.use("", express.static(path.join(__dirname, "./game-3d/dist")));

// Serve static files from the 2D game
app.use("/game-2d", express.static(path.join(__dirname, "./game-2d/www")));

// POST /score endpoint
app.post("/game-2d/score", (req, res) => {
  const { name, score, sessionId, map } = req.body;

  // Read the existing scores
  const scoreboard = JSON.parse(
    fs.readFileSync("scoreboard.json", "utf-8") || "[]"
  );

  // Add the new score
  scoreboard.push({ name, score, sessionId, map });

  // Write the new scores back to the file
  fs.writeFileSync("scoreboard.json", JSON.stringify(scoreboard));

  res.status(200).send("Score saved");
});

app.get("/game-2d/score/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId;

  // Read the existing scores
  const scoreboard = JSON.parse(
    fs.readFileSync("scoreboard.json", "utf-8") || "[]"
  );

  // Filter the scores for the given session ID
  const playerScores = scoreboard.filter(
    (score) => score.sessionId === sessionId
  );

  // Send the scores back to the client
  res.status(200).json(playerScores);
});

app.get("/game-2d/scoreboard", (req, res) => {
  const scoreboard = JSON.parse(
    fs.readFileSync("scoreboard.json", "utf-8") || "[]"
  );
  res.status(200).json(scoreboard);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:3000/`, "<- 3d");
  console.log(`http://localhost:3000/game-2d`, "2d map1");
  console.log(
    `http://localhost:3000/game-2d/?level=2`,
    "<- 2d map2(if unlocked only)"
  );
  console.log(`http://localhost:3000/game-2d/?level=3`, "<- 2d map3");
});
