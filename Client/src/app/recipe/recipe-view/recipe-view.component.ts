import {Component, OnInit} from '@angular/core';
import {Server} from '../../../../providers/server';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
    recipesAll;
    recipesSearch: any[] = [];
    recipesBio: any[] = [];
    p;

    foodsList: any;

    recipeBoolAll = false;
    recipeBoolBio = false;
    recipeBoolSearch = false;
    recipesAllCheck = false;
    recipesBioCheck = false;
    isLoading = false;

    constructor(public server: Server,
                private http: HttpClient) {
    }


    ngOnInit() {
        this.server.getAllRecipes().subscribe(
            data => {
                this.recipesAll = data;
                this.isLoading = true;
            }
        );
        this.recipeBoolAll = true;
        this.recipesAllCheck = true;
    }


    onEnterKey(event: any, searchbar) {
        if (searchbar.value == '') {
            this.recipesSearch = [];
            this.server.getAllRecipes()
                .subscribe(data => {
                        this.recipesAll = data;
                        // this.foodsList = data;
                    }, err => {
                    }
                );
            this.recipeBoolAll = true;
            this.recipesAllCheck = true;
        } else {
            let listToParse;
            this.recipesSearch = [];
            if (this.recipesBioCheck) {
                listToParse = this.recipesBio;
                this.recipeBoolBio = false;
                this.recipeBoolSearch = true;
            }
            if (this.recipesAllCheck) {
                listToParse = this.recipesAll;
                this.recipeBoolAll = false;
                this.recipeBoolSearch = true;
            }
            try {
                for (let entry of listToParse.result) {
                    var string = entry.name.toLowerCase(),
                        substring = searchbar.value.toLowerCase();
                    var index = string.indexOf(substring);
                    if (index != -1) {
                        this.recipesSearch.push(entry);

                    }
                }
            } catch (e) {
            }
        }
    }

    getAllProducts(e) {
        if (e.target.checked) {
            this.server.getAllRecipes().subscribe(
                data => {
                    this.recipesAll = data;
                    this.recipeBoolBio = false;
                    this.recipeBoolAll = true;
                }
            );
        }

        if (e.target.checked) {
            this.recipesAllCheck = true;
            this.recipesBioCheck = false;
        }

        this.recipesAllCheck = true;
        this.recipesBioCheck = false;
    }

    getBioProducts(e) {
        if (e.target.checked) {

            this.server.getRecipesBio()
                .subscribe(data => {
                        this.recipesBio = data;
                    this.recipeBoolBio = true;
                    this.recipeBoolAll = false;
                    console.log(data)
                    }, err => {
                    }
                );
        }

        if (e.target.checked) {
            this.recipesAllCheck = false;
            this.recipesBioCheck = true;
        }

        this.recipesAllCheck = false;
        this.recipesBioCheck = true;
    }

}


