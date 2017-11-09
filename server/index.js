var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
  if (err) {
    throw err
  }

  /*var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([{a : 1}, {a : 2}, {a : 3}], function(err, result) {
    if (err) {
      throw err
    }
    console.log(result)
  });*/

  /*db.collection('documents').find().toArray(function(err, result) {
    if (err) {
      throw err
    }

    console.log(result)
  })*/

  
})

