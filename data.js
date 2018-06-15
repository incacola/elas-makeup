const elasticsearch = require('elasticsearch');
const cities = require('./makeup.json')

const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200']
});

client.ping({
  requestTimeout: 300000,
}, (error) => {
  if (error) {
    return console.log('Elasticsearch cluster is down!')
  } else {
    console.log(' Elasticsearch is Working!')
  }
})

client.indices.create({
  index: 'elas-makeup'
}, (error, response, status) => {
  error ? console.log(error) : console.log('Created a new index', response)
})

let bulk = []

cities.forEach(city => {
  bulk.push({
    index: {
      _index: "elas-makeup",
      _type: "product_list"
    }
  })
  bulk.push(city)
})

client.bulk({
  body: bulk
}, (err, response) => {
  err ? console.log('Failed Bulk operation on the Elasticsearch: '.red, err) : console.log('Successfully imported %s '.green, cities.lenght)
})