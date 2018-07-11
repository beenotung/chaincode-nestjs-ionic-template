#!/bin/bash
set -e
set -o pipefail

cd spec
rm -rf node_modules package-lock.json yarn.lock
#npm i
yarn --offline ||  yarn
npm run build
rm -rf node_modules

cd ../client
rm -rf node_modules package-lock.json yarn.lock
#npm i
yarn --offline ||  yarn
npm i -S ../spec

cd ../server
rm -rf node_modules package-lock.json yarn.lock
source ~/.nvm/nvm.sh && nvm use --delete-prefix node || true
npm i
#yarn --offline ||  yarn
npm i -S ../spec

echo done.
