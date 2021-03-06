#!/bin/bash -xe

# set PG_CONNECTION_STRING to the local server
export PG_CONNECTION_STRING=postgres://postgres@localhost/postgres

STAGE=prod npm run build          # make the production build
rm -fr .gourmet/prod/info         # remove unnecessary files
STAGE=prod npm run migrate        # run migrations

sudo systemctl stop news-ssr      # stop currently running server
sudo rm -fr /var/app/news-ssr/*   # delete the current deployment

# copy newly built files, and install dependencies in production mode
sudo -u nodejs cp -R *.js *.json lib .gourmet /var/app/news-ssr/
sudo -u nodejs bash -c 'cd /var/app/news-ssr; npm install --production'

sudo systemctl start news-ssr     # restart the server
