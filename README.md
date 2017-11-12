## URL
https://vis.wangriwu.com/

## Import data to MongoDB
Download from http://labs.semanticscholar.org/corpus/ and extract the first 200000 lines  
`sed -i '' '200001,$ d' papers-2017-02-21.json`  
`mongoimport --db cs3219 --collection a4papers --file papers-2017-02-21.json`  

## Sample entries
#### Venues
ArXiv  
ICSE  

#### Papers
Low-density parity check codes over GF(q)  
A more accurate one-dimensional analysis and design of irregular LDPC codes
