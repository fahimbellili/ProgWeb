const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var _ = require("lodash");
var ObjectID = require("mongodb").ObjectID;

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var url = "mongodb://admin1:admin1@ds247191.mlab.com:47191/off";
var db;

const dbName = "off";
const collFood = "france";
const collRecipe = "recipes";
const collPrices = "prices";
const collComments = "comments";

var alimentsName = [];
var alimentsWithoutAllergens = [];
var alimentsBio = [];
var idsRecipes = 0;

/*
Initialisation
 */
const mongoClient = new MongoClient(url);
mongoClient.connect(async function (err) {
    db = mongoClient.db(dbName);
    app.listen(process.env.PORT || 8080, () => {
        console.log("OFF - Server running on port 8080");
    });
});

async function initAliments() {

    MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            db = mongoClient.db(dbName);
            const collection = db.collection(collFood);
            collection.find({
                $or: [
                    {"nutriments.salt_100g": {$exists: true}},
                    {"nutriments.sugars_100g": {$exists: true}},
                    {"nutriments.fat_100g": {$exists: true}}
                ]
            })
                .toArray(function (err, docs) {
                    alimentsName = _.sortBy(
                        docs
                            .map(doc => {
                                return {
                                    id: doc._id,
                                    name: doc.product_name
                                };
                            })
                            .filter(x => {
                                return x != null;
                            }),
                    );
                });
        }
    );

    MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            db = mongoClient.db(dbName);
            const collection = db.collection(collFood);
            let query = {
                "allergens_tags": []
            };
            collection.find(query)
                .toArray(function (err, docs) {
                    alimentsWithoutAllergens = _.sortBy(
                        docs
                            .map(doc => {
                                return {
                                    id: doc._id,
                                    name: doc.product_name
                                };
                            })
                            .filter(x => {
                                return x != null;
                            }),
                    );
                });
        }
    );

    MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            db = mongoClient.db(dbName);
            const collection = db.collection(collFood);

            collection.find({"product_name": /.*BIO.*/i})
                .toArray(function (err, docs) {
                    alimentsBio = _.sortBy(
                        docs
                            .map(doc => {
                                return {
                                    id: doc._id,
                                    name: doc.product_name
                                };
                            })
                            .filter(x => {
                                return x != null;
                            }),
                    );
                });
        }
    );

    MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            db = mongoClient.db(dbName);
            const collection = db.collection(collRecipe);

            collection.find()
                .toArray(function (err, docs) {
                    idsRecipes=docs.length;
                });
        }
    );
}

initAliments();

/*
PARTIE API
 */


/*
Routes
 */

/*
GET :
 */

app.get("/", function (req, res) {
    let print = "<ul>\n" +
        "  <li>getScore/idProduct ⇒ assign foods an overall score according to some mix of criteria</li>\n" +
        "  <li>getRecipeBio/ : return les recettes exclusivements composées de produits bio\n</li>\n" +
        "  <li>getRecipeWithoutAllergens : return les recettes n’ayant pas d’allergens</li>\n" +
        "  <li>getPrice/idRecipe/ ⇒ determine the price of a given recipe based on the prices of given ingredients</li>\n" +
        "  <li>/getProduct/id : renvoie le json complet d’un produit en fournissant son identifiant dans le bd.</li>\n" +
        "  <li>/getAll : renvoie la liste de tous les produits possibles + id (requis pour faire les autres requêtes)</li>\n" +
        "  <li>/getAlimentsWithoutAllergens Renvoie la liste avec id des aliments qui ne contiennent pas d’allergènes\n</li>\n" +
        "  <li>getAlimentsBio Renvoie la liste avec id des aliments qui sont BIO\n</li>\n" +
        "  <li>addRecipe/ : req post ajoute une recette</li>\n" +
        "  <li>addPrice : req post (price, shop, lat, long, date of entry, nameOfProduct) ajoute un prix </li>\n" +
        "  <li>addComment/ : req post (pseudoUser, idRecipe, contentComment) : ajoute un commentaire à la recette d’id “id”</li>\n" +
        "  <li>getComments/idRecipe : return commentaires d’une recette d’id : “id”</li>\n" +
        "  <li>getRecipe/id : return la recette d’id : “id\"</li>\n" + "</ul>"
    res.render(
        print
    )
});


app.get("/getAll", async function (req, res, next) {
    res.send({
        result: alimentsName
    })
});

app.get("/getAlimentsWithoutAllergens", async function (req, res, next) {
    res.send({
        result: alimentsWithoutAllergens
    })
});

app.get("/getAlimentsBio", async function (req, res, next) {
    res.send({
        result: alimentsBio
    })
});

app.get("/getProduct/:id", async function (req, res, next) {
    const id = req.params.id;
    MongoClient.connect(url, function (err) {
        if (err) throw err;
        let query = {_id: id};
        db.collection(collFood).find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send({
                passed: true,
                result: result
            });
        });
    });
});

app.get("/getScore/:idProduct", async function (req, res, next) {
    const id = req.params.idProduct;
    let query = {id: id};
    const collection = await db.collection(collFood);
    collection
        .find(query)
        .toArray(function (err, docs) {
            let result = _.sortBy(
                docs
                    .map(doc => {
                        let cmp = 3;
                        let fat =
                            doc.nutriments.fat_100g ||
                            (() => {
                                cmp--;
                                return 0;
                            });
                        let sugar =
                            doc.nutriments.sugars_100g ||
                            (() => {
                                cmp--;
                                return 0;
                            });
                        let salt =
                            doc.nutriments.salt_100g ||
                            (() => {
                                cmp--;
                                return 0;
                            });
                        let score = 0;
                        score =
                            (Number.parseFloat(fat) +
                                Number.parseFloat(sugar) +
                                Number.parseFloat(salt)) /
                            cmp;
                        if (score === 0 || !score) return null;

                        return {
                            id: doc._id,
                            name: doc.product_name,
                            score: score.toFixed(3)
                        };
                    })
                    .filter(x => {
                        return x != null;
                    }),
                ["score", "name"]
            );
            res.send({
                result: result
            });
        });
});


app.get("/getRecipe/:id", async function (req, res, next) {
    const id = req.params.id;
    const collection = await db.collection(collRecipe);
    let query = {id: +id};
    collection.find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send({
            result: result
        });
    });
});

app.get("/getComments/:id", async function (req, res, next) {
    const id = req.params.id;
    const collection = await db.collection(collComments);
    let query = {idRecipe: +id};
    collection.find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send({
            result: result
        });
    });
});


app.get("/getRecipeBio", async function (req, res) {
    let tabToBeReturned = [];
    let data = [];
    let recipeIsBio;
    let ingredients;

    const collection = db.collection(collRecipe);
    collection.find().toArray(function (err, result) {
        if (err) throw err;
        data = result;
        console.log("data : "+data);
    });
    for (let i = 0; i < data.length; i++) {
        recipeIsBio = true;
        ingredients = data[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
            if (alimentsBio.indexOf(ingredients[j]) === -1) {
                recipeIsBio = false;
            }
        }
        if (recipeIsBio) {
            tabToBeReturned.push(data[i]);
        }
    }
    res.send({
        result: tabToBeReturned
    });
});

app.get("/getRecipeWithoutAllergens", async function (req, res) {
    let tabToBeReturned = [];
    let data = [];
    let recipeIsWithoutAllergens;
    let ingredients;

    const collection = db.collection(collRecipe);
    collection.find().toArray(function (err, result) {
        if (err) throw err;
        data = result;
    });
    for (let i = 0; i < data.length; i++) {
        recipeIsWithoutAllergens = true;
        ingredients = data[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
            if (alimentsWithoutAllergens.indexOf(ingredients[j]) === -1) {
                recipeIsWithoutAllergens = false;
            }
        }
        if (recipeIsWithoutAllergens) {
            tabToBeReturned.push(data[i]);
        }
    }
    res.send({
        result: tabToBeReturned
    });
});

/*
POST
 */

app.post("/addPrice", async function (req, res, next) {
    let price = req.body.price;
    let shop = req.body.shop;
    let lat = req.body.lat;
    let long = req.body.long;
    let date = new Date().getTime();
    let nameOfProduct = req.body.nameOfProduct;
    var obj = {
        price: price,
        shop: shop,
        lat: lat,
        long: long,
        date: date,
        nameOfProduct: nameOfProduct
    };
    db.collection(collPrices).insertOne(obj, function (err, res) {
        if (err) throw err;
    });
    res.send({
        passed: true
    });
});

app.post("/addRecipe", async function (req, res, next) {
    idsRecipes++;
    let name = req.body.name;
    let ingredients = req.body.ingredients;
    var obj = {
        id: idsRecipes,
        name: name,
        ingredients: ingredients
    };
    db.collection(collRecipe).insertOne(obj, function (err, res) {
        if (err) throw err;
    });
    res.send({
        passed: true
    });
});

app.post("/addComment", async function (req, res, next) {
    let pseudoUser = req.body.pseudoUser;
    let idRecipe = req.body.pseudoUser;
    let content = req.body.content;

    var obj = {
        pseudoUser: pseudoUser,
        idRecipe: idRecipe,
        content: content
    };
    db.collection(collComments).insertOne(obj, function (err, res) {
        if (err) throw err;
    });
    res.send({
        passed: true
    });
});

