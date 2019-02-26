import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class Server {

    path: string;
    config = {headers:  {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    constructor(private http: HttpClient) {
        this.path = 'https://progweb2019server.herokuapp.com';
    }

    getAllScore(idProduct): Observable<any> {
        return this.http.get(this.path + '/getScore/' + idProduct, this.config);
    }

    getAllProductId(id): Observable<any> {
        return this.http.get(this.path + '/getProduct/' + id, this.config);
    }

    getComments(id): Observable<any> {
        return this.http.get(this.path + '/getComments/' + id, this.config);
    }

    getRecipe(id): Observable<any> {
        return this.http.get(this.path + '/getRecipe/' + id, this.config);
    }

    getAllProducts(): Observable<any> {
        return this.http.get(this.path + '/getAll', this.config);
    }

    getAllAlimentsBio(): Observable<any> {
        return this.http.get(this.path + '/getAlimentsBio', this.config);
    }

    getAllAlimentsWithoutAllergens(): Observable<any> {
        return this.http.get(this.path + '/getAlimentsWithoutAllergens', this.config);
    }

    getAllRecipes(): Observable<any> {
        return this.http.get(this.path + '/getAllRecipes', this.config);
    }

    getRecipesBio(): Observable<any> {
        return this.http.get(this.path + '/getRecipeBio', this.config);
    }

    getAllPrices(): Observable<any> {
        return this.http.get(this.path + '/getAllPrices', this.config);
    }

}
