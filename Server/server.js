"use strict";
let Recipe = require("./models/recipe");
let RecipeList = require("./models/recipeList");

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://admin1:admin1@ds247191.mlab.com:47191/off";

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();
const ProtectedRoutes = express.Router();
app.use('/api', ProtectedRoutes);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(express.static('media'));

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("off");
    dbo.createCollection("france", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});


console.log("OFF - Server");
console.log("Connecting ...")

const http = require('http').Server(app);
const server = app.listen(process.env.PORT || 8080);
var recipeList = new RecipeList();

/**
 * Partie API
 */

app.get('/getProduct/:id', function (req, res) {
    const id = req.params.id;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("off");
        var query = {id: id};
        dbo.collection("france").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send({
                passed: true,
                result: result
                });
            db.close();
        });
    });
});


app.get('/getScore/:id', function (req, res) {
    const id = req.params.id;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("off");
        var query = {id: id};
        dbo.collection("france").find(query).toArray(function (err, result) {
            if (err) throw err;
            let nutriscore;
            try {
                nutriscore = JSON.parse(JSON.stringify(result[0])).nutrition_score_debug;
            }catch (e){
                nutriscore = "Indefini"
            }
            res.send({
                passed: true,
                result: nutriscore
            });
            db.close();
        });
    });
});