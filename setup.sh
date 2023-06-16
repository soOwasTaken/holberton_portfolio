#!/bin/bash

git clone https://github.com/soOwasTaken/GQ2D game-2d
cd game-2d
npm install
cd ..
git clone https://github.com/rChrisb/Galaxy_3D game-3d
cd game-3d
npm install
cd ..

echo "Repositories cloned and folders renamed successfully!"
