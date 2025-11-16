#!/bin/bash
nvm install v24

if [ -f "package-lock.json" ]
then
  npm ci
else
  npm install && npm install
fi
