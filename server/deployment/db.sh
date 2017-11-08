#!/bin/sh

mongoimport -d cs3219 -c a4papers < data.json

mongo cs3219 --eval "db.a4papers.createIndex({ id: 'hashed' })"
mongo cs3219 --eval "db.a4papers.createIndex({ venue: 1, year: 1 })"
