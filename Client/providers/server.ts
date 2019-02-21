import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export class Server {

    path: string;

    constructor() {
        this.path = 'https://offserver2019.herokuapp.com';
    }

    getAllPath() {
        return this.path;
    }

    getScore(idProduct) {
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + ('/getScore' + ('/') + (idProduct)), false);
        req.send(null);
        return req;
    }

    getProduct(id) {
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + ('/getProduct' + ('/') + (id)), false);
        req.send(null);
        return req;
    }

    getComments(id) {
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + ('/getComments' + ('/') + (id)), false);
        req.send(null);
        return req;
    }

    getRecipe(id) {
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + ('/getRecipe' + ('/') + (id)), false);
        req.send(null);
        return req;
    }

    getAll() {
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + ('/getAll'), false);
        req.send(null);
        return req;
    }

    getAlimentsBio() {
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + '/getAlimentsBio', false);
        req.send(null);
        return req;
    }

    getAlimentsWithoutAllergens() {
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + ('/getAlimentsWithoutAllergens'), false);
        req.send(null);
        return req;
    }

    //getPrice/idRecipe/
    getPrice(idRecipe) {
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + ('/getPrice' + ('/') + (idRecipe)), false);
        req.send(null);
        return req;
    }

    getAllRecipes(){
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + ('/getAllRecipes'), false);
        req.send(null);
        return req;
    }


}
