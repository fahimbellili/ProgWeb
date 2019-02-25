import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class Server {

    path: string;

    constructor(private http: HttpClient) {
        this.path = 'https://offserver2019.herokuapp.com';
    }

    getAllScore(idProduct): Observable<any> {
        return this.http.get(this.path + '/getScore/' + idProduct);
    }

    getAllProductId(id): Observable<any> {
        return this.http.get(this.path + '/getProduct/' + id);
    }

    getComments(id): Observable<any> {
        return this.http.get(this.path + '/getComments/' + id);
    }

    getRecipe(id): Observable<any> {
        return this.http.get(this.path + '/getRecipe/' + id);
    }

    getAllProducts(): Observable<any> {
        return this.http.get(this.path + '/getAll');
    }

    getAllAlimentsBio(): Observable<any> {
        return this.http.get(this.path + '/getAlimentsBio');
    }

    getAllAlimentsWithoutAllergens(): Observable<any> {
        return this.http.get(this.path + '/getAlimentsWithoutAllergens');
    }

    getAllRecipes(): Observable<any> {
        return this.http.get(this.path + '/getAllRecipes');
    }

    getRecipesBio(): Observable<any> {
        return this.http.get(this.path + '/getRecipeBio');
    }

    getAllPrices(): Observable<any> {
        return this.http.get(this.path + '/getAllPrices');
    }

}
