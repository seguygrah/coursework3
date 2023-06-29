const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs')
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'images')));

// MongoDB Connection
const mongoURL = 'mongodb+srv://grahkevinseguy:Tree0nice@cluster0.8q26p8n.mongodb.net/test';

const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }

  console.log('Connected to the database');

  const db = client.db('cw2');

    app.use(function (req, res, next){
    console.log(`${req.method} ${req.url}`);
    next();
    });

// Middleware - Static File
    app.use((req, res, next) => {
    const imagePath = path.join(__dirname, 'images', req.url);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        next()
        
    }
    });

// Middleware - Param: collectionName
    app.param('collectionName', function (req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
    });

// Routes - Get all
app.get('/collection/:collectionName', function (req, res) {
  req.collection.find().toArray(function (err, results) {
    if (err) {
      console.error('Error retrieving lessons:', err);
      res.status(500).json({ message: 'Error retrieving lessons' });
    } else {
      res.json(results);
    }
  });
});

// Routes - Create
app.post('/collection/:collectionName', function (req, res) {
    req.collection.insertOne(req.body, function (err, result) {
    if (err) {
      res.status(500).json({ message: 'Error creating inserting' });
    } else {
        res.send(result.ops);
    }
  });
});

// Routes - put
app.put('/collection/:collectionName/:id', function (req, res,next) {
  req.collection.updateOne(
    { _id: ObjectID(req.params.id) },
    {$set:req.body},
    (err,result) => {
        if (err) return next(err)
        res.json(result.result.n == 1 ? {"msg":true} : {"msg":false});
    }
  );
});

// Start the server
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
});