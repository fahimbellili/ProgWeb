"use strict";
let Recipe = require("./models/recipe");
let RecipeList = require("./models/recipeList");

var fs = require('fs');
var passwordHash = require('password-hash');

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
const jwt = require('jsonwebtoken');
//const config = require('./configuration/config');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(express.static('media'));
//app.set('Secret', config.secret);

const qs = require('querystring');
const nodemailer = require('nodemailer');

var ref = new Date();

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("off");
    dbo.createCollection("recipes", function (err, res) {
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


ProtectedRoutes.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, token, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    var token = req.headers['token'];
    if (token) {
        jwt.verify(token, app.get('Secret'), (err, decoded) => {
            if (err) {
                return res.json({message: 'invalid token'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            message: 'No token provided.'
        });
    }
});

/**
 * Partie API
 */


app.get('/getAll', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("off");
        dbo.collection("recipes").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.send({
                passed: true,
                result: result,
            });
        });
    });
});

//Partie Swarms :

app.get('/addSwarm/:latitude/:longitude/:date/:hour/:feature/:height/:description/:county/:numberObs/:size/:insectType/:pic/:idDevice', function (req, res) {
    const id = swarmList.getSize();
    const longitude = req.params.longitude;
    const latitude = req.params.latitude;
    const date = req.params.date;
    const hour = req.params.hour;
    const feature = req.params.feature;
    const height = req.params.height;
    const description = req.params.description;
    const county = req.params.county;
    const numberObs = req.params.numberObs;
    const size = req.params.size;
    const insectType = req.params.insectType;
    const pic = req.params.pic;
    const idDevice = req.params.idDevice;

    var swarm = new Swarm(id, latitude, longitude, date, hour, feature, height, description, county, numberObs, size, insectType, pic, false, idDevice);
    swarmList.push(swarm);


    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var newSwarm = {
            id: id,
            latitude: latitude,
            longitude: longitude,
            date: date,
            hour: hour,
            feature: feature,
            height: height,
            description: description,
            county: county,
            numberObs: numberObs,
            isTreated: false,
            size: size,
            insectType: insectType,
            pic: pic,
            isAvailable: true,
            idDevice: idDevice
        };
        dbo.collection("swarms").insertOne(newSwarm, function (err, res) {
            if (err) throw err;
            console.log("Essaim ajouté");
            db.close();
        });
    });
    res.send({
        passed: true,
        swarm: swarm
    });
    generateCsv();
    notifyNearestBeekeepers(latitude, longitude);
});

ProtectedRoutes.get('/getSwarms', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        dbo.collection("swarms").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send({
                passed: true,
                result: result
            });
            db.close();
        });
    });
});

ProtectedRoutes.get('/getAvailableSwarms', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var query = {isAvailable: true};
        dbo.collection("swarms").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send({
                passed: true,
                result: result
            });
            db.close();
        });
    });
});

ProtectedRoutes.get('/retrieve/:idSwarm', (req, res) => {
    const idSwarm = req.params.idSwarm;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var query = {id: +idSwarm};
        var myquery = {idSwarm: idSwarm};
        var newvalues = {$set: {isAvailable: false}};
        dbo.collection("swarms").updateOne(query, newvalues, function (err, res) {
            if (err) throw err;
            db.close();
        });
        dbo.collection("reservations").deleteMany(myquery, function (err, obj) {
            if (err) throw err;
            db.close();
        });
        res.send({
            passed: true
        });
    });
});

app.get('/createBeekeeper/:name/:surname/:latCentre/:longCentre/:ray/:passcode/:phone/:mail', function (req, res) {
    const id = beekeeperList.getSize();
    const name = req.params.name;
    const surname = req.params.surname;
    const latCentre = req.params.latCentre;
    const longCentre = req.params.longCentre;
    const ray = req.params.ray;
    const passcode = req.params.passcode;
    const hashedPassword = passwordHash.generate(passcode);

    const phone = req.params.phone;
    const mail = req.params.mail;


    var alreadyExists = false;
    var beekeeper = new Beekeeper(id, name, surname, latCentre, longCentre, ray, hashedPassword, phone, mail);
    for (var i = 0; i < beekeeperList.getSize(); i++) {
        if (beekeeperList.getList()[i].getMail() === beekeeper.getMail()) {
            alreadyExists = true;
        }
    }

    if (alreadyExists) {
        res.send({
            passed: false
        });
        console.log("user already exists");
    } else {
        beekeeperList.push(beekeeper);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("ApisCampus");
            var newBeekeeper = {
                id: id,
                name: name,
                surname: surname,
                latCentre: latCentre,
                longCentre: longCentre,
                ray: ray,
                passcode: hashedPassword,
                phone: phone,
                mail: mail
            };
            dbo.collection("beekeepers").insertOne(newBeekeeper, function (err, res) {
                if (err) throw err;
                console.log("Apiculteur ajouté");
                db.close();
            });
        });
        res.send({
            passed: true,
            idBeekeeper: id
        });
    }
});


app.get('/login/:mail/:passcode', function (req, res) {
    const mail = req.params.mail;
    const passcode = req.params.passcode;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var query = {mail: mail};
        dbo.collection("beekeepers").find(query).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            if (result.length > 0) {
                if (passwordHash.verify(passcode, result[0].passcode)) {
                    const payload = {
                        check: true
                    };
                    var token = jwt.sign(payload, app.get('Secret'), {
                        expiresIn: 1440
                    });
                    res.send({
                        passed: true,
                        result: result,
                        token: token
                    });
                } else {
                    res.send({
                        passed: false
                    });
                }
            } else {
                res.send({
                    passed: false
                });
            }
        });
    });

});

function generateCsv() {
    var content = "ID;LONGITUDE;LATITUDE;DATE;HOUR;FEATURE;HEIGHT;DESCRIPTION;COUNTY;NUMBER_OBS;ISTREATED;SIZE;INSECT_TYPE\n";
    for (var i = 0; i < swarmList.getSize(); i++) {
        var currentSwarm = swarmList.getList()[i];
        content += currentSwarm.getId() + ";" + currentSwarm.getLongitude() + ";" + currentSwarm.getLatitude() + ";" + currentSwarm.getDate() + ";" + currentSwarm.getHour() + ";" + currentSwarm.getFeature() + ";" + currentSwarm.getHeight() + ";" + currentSwarm.getDescription() + ";" + currentSwarm.getCounty() + ";" + currentSwarm.getNumberObs() + ";" + currentSwarm.isTreated() + ";" + currentSwarm.getSize() + ";" + currentSwarm.getInsectType() + "\n";
    }
    fs.writeFile("file/swarms.csv", content, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}


ProtectedRoutes.get('/getBeekeepers', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        dbo.collection("beekeepers").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send({
                passed: true,
                result: result
            });
            db.close();
        });
    });
});

//Partie reservation


ProtectedRoutes.get('/treat/:idApi/:idSwarm', (req, res) => {
    const idApi = req.params.idApi;
    const idSwarm = req.params.idSwarm;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        ref = new Date();
        var newReservation = {
            idApi: idApi,
            idSwarm: idSwarm,
            date: ref.getTime()
        };
        dbo.collection("reservations").find({$or: [{idApi: idApi}, {idSwarm: idSwarm}]}).toArray(function (err, result) {
            if (err) throw err;
            if (result.length === 0) {
                dbo.collection("reservations").insertOne(newReservation, function (err, res) {
                    if (err) throw err;
                    console.log("Reservation ajoutée");
                    db.close();
                });
                res.send({
                    passed: true,
                });
                var myquery = {id: +idSwarm};
                var newvalues = {$set: {isTreated: true}};
                dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("L'essaim a été mis à jour");
                    db.close();
                });
            } else {
                res.send({
                    passed: false,
                });
            }
            db.close();
        });
    });
});

ProtectedRoutes.get('/getReservation/:idApi', (req, res) => {
    const idApi = req.params.idApi;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var query = {idApi: idApi};
        dbo.collection("reservations").find(query).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.send({
                passed: true,
                result: result
            });
        });
    });

});

ProtectedRoutes.get('/cancelReservation/:idSwarm', (req, res) => {
    const idSwarm = req.params.idSwarm;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {idSwarm: idSwarm};
        dbo.collection("reservations").deleteMany(myquery, function (err, obj) {
            if (err) throw err;
            db.close();
        });
        var newvalues = {$set: {isTreated: false}};
        var newQuery = {id: +idSwarm};
        dbo.collection("swarms").updateOne(newQuery, newvalues, function (err, res) {
            if (err) throw err;
            db.close();
        });

    });
    res.send({
        passed: true
    });
});

function updateReservations() {
    var ids = [];
    var myRef = new Date();
    let currentDate = myRef.getTime();
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {date: {$lt: currentDate - 54000000}};//54000000 == 15h : current - date > 15h ==> on supprime
        dbo.collection("reservations").find(myquery).toArray(function (err, result) {
            if (err) throw err;
            var newvalues = {$set: {isTreated: false}};
            for (let i = 0; i < result.length; i++) {
                ids.push(result[i].idSwarm);
                var newQuery = {id: +result[i].idSwarm};
                dbo.collection("swarms").updateOne(newQuery, newvalues, function (err, res) {
                    if (err) throw err;
                    db.close();
                });
            }
            db.close();
        });
        dbo.collection("reservations").deleteMany(myquery, function (err, obj) {
            if (err) throw err;
            db.close();
        });
    });
}

setInterval(updateReservations, 3600000);//3600000



