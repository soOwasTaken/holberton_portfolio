#!/bin/bash

cd game-2d
git pull
npm run build
cd ..
cd game-3d
git pull
parcel build src/index.html --public-url ./
parcel build src/pinkplanet.html --public-url ./
parcel build src/redplanet.html --public-url ./
cd ..

echo "Repositories & build sucessfully Updated Properly"
node server.js

echo "vlaaaaaaa le serveur il est lancer en balle et tout là"
echo "http://localhost:3000/"
echo "http://localhost:3000/game-2d"