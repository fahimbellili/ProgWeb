"use strict";

module.exports = class Recipe {


    constructor(id, name, ingredients, user, comments) {
        this._id = id;
        this._name = name;
        this._ingredients = ingredients;
        this._user = user;
        this._comments = comments;
    }


    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getIngredients() {
        return this._ingredients;
    }

    getUser() {
        return this._user;
    }

    getComments() {
        return this._comments;
    }
}