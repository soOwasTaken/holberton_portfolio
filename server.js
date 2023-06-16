const express = require("express");
const app = express();
const path = require("path");

// Serve the static files from your 3D game


app.use("", express.static(path.join(__dirname, "./game-3d/dist"))); // Replace '../galaxy_3d' with the actual path to the 3D game

// Serve static files from the 2D game
app.use("/game-2d", express.static(path.join(__dirname, "./game-2d/www")));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
