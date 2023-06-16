#!/bin/bash

cd game-2d
git pull
npm run build
cd ..
cd game-3d
git pull
parcel build src/index.html --public-url ./
cd ..

echo "Repositories & Builds Updated Properly"
#!/bin/bash