import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../recipe/recipe";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Server} from "../../../providers/server";

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

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

    handleErrorObservable(error
                              :
                              Response | any
    ) {
        console.error(error.message || error);
        return error;
    }
}
