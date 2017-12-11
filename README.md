## URL
https://vis.wangriwu.com/

## Deployment
Download from http://labs.semanticscholar.org/corpus/ and extract the first 200000 lines  
`sed -i '' '200001,$ d' papers-2017-02-21.json`   
`mv papers-2017-02-21.json server/deployment/data.json`   
`server/deployment/db.sh`  
`mongo < server/deployment/clean.js`

## Sample entries
#### Venues
ArXiv  
ICSE  

#### Papers
Low-density parity check codes over GF(q)  
A more accurate one-dimensional analysis and design of irregular LDPC codes
