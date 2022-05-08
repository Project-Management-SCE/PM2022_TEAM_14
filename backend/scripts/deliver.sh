#!/usr/bin/env sh

set -x
npm run start &
sleep 1
echo $! > .pidfile
set +x
kill $(cat .pidfile)
