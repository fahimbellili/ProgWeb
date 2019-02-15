import {Component, OnInit} from '@angular/core';
import {Server} from "../../../providers/server";
import {HttpClient} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpHeaders} from '@angular/common/http';
import {RequestOptions} from "@angular/http";
import {Recipe} from "../../recipe/recipe";


@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    private searchInput: string;

    constructor(public server: Server,
                private http: HttpClient) {
    }

    ngOnInit() {
    }

    onEnterKey(event: any) {
        console.log(this.server.getAll().responseText)
    }

    logRequest() {
        // let req = this.server.getProduct(this.searchInput);
        // console.log(req)
        let ing: string[] = ["ing", "deg"];
        var recipe = new Recipe("a", ing);


        const recipeStr = JSON.stringify(recipe);

        this.postRecipe(recipe)
    }

    postRecipe(recipe
                   :
                   Recipe
    ):
        Observable<Recipe> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        return this.http.post("https://offserver2019.herokuapp.com/addRecipe", recipe, httpOptions)
            .pipe(this.handleErrorObservable);
    }

    private

    handleErrorObservable(error
                              :
                              Response | any
    ) {
        console.error(error.message || error);
        return error;
    }

}
