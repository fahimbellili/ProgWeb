import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class Server {

    path: string;

    constructor(private http: HttpClient) {
        this.path = 'http://localhost:8080';
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


    getComments(id) : Observable<any>{
        return this.http.get(this.path + '/getComments/' + id)
    }

    getRecipe(id) : Observable<any>{
        return this.http.get(this.path + '/getRecipe/' + id)
    }

    /* cette méthode est la même que  getAll si dessous */
    getAllProducts(): Observable<any> {
        return this.http.get(this.path + '/getAll');
    }

    getAll() {
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + ('/getAll'), true);
        req.send(null);

        return req;
    }

    /* cette méthode est la même que  getAlimentsBio si dessous */
    getAllAlimentsBio(): Observable<any> {
        return this.http.get(this.path + '/getAlimentsBio');
    }

    getAlimentsBio() {
        let req = new XMLHttpRequest();
        req.open('GET', this.getAllPath() + '/getAlimentsBio', false);
        req.send(null);
        return req;
    }

    /* cette méthode est la même que  getAlimentsWithoutAllergens si dessous */
    getAllAlimentsWithoutAllergens(): Observable<any> {
        return this.http.get(this.path + '/getAlimentsWithoutAllergens');
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

    getAllRecipes() : Observable<any>{
        return this.http.get(this.path + '/getAllRecipes')
    }

    getAllPrices() : Observable<any>{
        return this.http.get(this.path + '/getAllPrices')
    }

}
