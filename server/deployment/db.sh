#!/bin/sh

mongoimport -d cs3219 -c a5papers --drop < data.json

mongo cs3219 --eval "db.a5papers.createIndex({ id: 'hashed' })"
mongo cs3219 --eval "db.a5papers.createIndex({ venue: 1, year: 1 })"
