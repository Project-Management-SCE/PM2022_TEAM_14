#!/usr/bin/env sh

set -x
pwd
cd backend
git add .
git commit 'deploy'
git push heroku master
print "Link is : https://newsappprod.herokuapp.com/ "