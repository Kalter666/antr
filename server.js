/**
 * Created by kalter on 9/3/2016.
 */
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
const mongojs = require('mongojs');
const db = mongojs('contactlist', ['contactlist']);
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/contactlist', (req, res) => {
  console.log('here is get req');
  db.contactlist.find( (err, list) => {
    if (!err) {
      return res.json(list);
    } else {
      res.statusCode = 500;
      console.error('Internal error(%d): %s',res.statusCode,err.message);
      return res.json({ error: 'Server error' });
    }
  });
});

app.post('/contactlist', (req, res) => {
  console.log(req.body);
  db.contactlist.insert(req.body, (err, doc) => {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectID(id)}, (err, doc) => {
    res.json(doc);
  });
});

app.listen(3000);
console.log('server starts');