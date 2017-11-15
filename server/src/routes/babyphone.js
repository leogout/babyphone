module.exports = function(app, db) {
  app.get('/babyphones', (req, res) => {
    db.collection('babyphone').find().toArray()
      .then(result => {
        res.send(result.ops[0])
      })
      .catch(err => {
        console.log(err)
        res.send({error: 'An error occured while requesting babyphones.'})
      })
  })

  app.post('/babyphones', (req, res) => {
    const babyphone = { name: req.body.name }

    db.collection('babyphone').insertOne(babyphone)
      .then(result => {
        res.send(result.ops[0])
      })
      .catch(err => {
        res.send({error: 'An error occured while inserting a new babyphone.'})
      })
  })
}