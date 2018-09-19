#!/bin/sh

npm run start &
sleep 1
npm run photons &
sleep 1
npm run client &
sleep 1
npm run client