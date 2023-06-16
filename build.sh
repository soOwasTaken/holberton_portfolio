#!/bin/bash
cd game-3d
parcel build src/index.html --public-url ./
cd ..
cd game-2d
npm run build
cd ..
node server.js