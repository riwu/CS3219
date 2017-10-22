sed -i '' '200001,$ d' papers-2017-02-21.json  
mongoimport --db cs3219 --collection a4papers --file papers-2017-02-21.json
