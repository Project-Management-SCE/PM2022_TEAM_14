#!/usr/bin/env sh

set -x
pwd
cd backend
npm start &
sleep 1
echo $! > .pidfile
set +x
kill $(cat .pidfile)
