import {Component, OnInit} from '@angular/core';
import {Server} from "../../../../providers/server";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
    recipesAll;
    recipesSearch: any[] = [];
    recipesBio: any;
    recipesWithoutAllergens: any;

    foodsList: any;

    recipeBoolAll = false;
    recipeBoolBio = false;
    recipeBoolAllerg = false;
    recipeBoolSearch = false;
    recipesAllCheck = false;
    recipesBioCheck = false;
    recipesAllergCheck = false;

    constructor(public server: Server,
                private http: HttpClient) {
    }


    ngOnInit() {
        this.server.getAllRecipes().subscribe(
            data => {
                this.recipesAll = data;
            }
        );
        this.recipeBoolAll = true;
        this.recipesAllCheck = true;
    }


    onEnterKey(event: any, searchbar) {
        if (searchbar.value == "") {
            this.server.getAllRecipes()
                .subscribe(data => {
                        this.recipesAll = data;
                        // this.foodsList = data;
                    }, err => {
                        console.log(err);
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
            if (this.recipesAllergCheck) {
                listToParse = this.recipesWithoutAllergens;
                this.recipeBoolAllerg = false;
                this.recipeBoolSearch = true;
            }
            if (this.recipesAllCheck) {
                listToParse = this.recipesAll;
                this.recipeBoolAll = false;
                this.recipeBoolSearch = true;
                console.log("here")
            }
            try {
                for (let entry of listToParse.result) {
                    var string = entry.name.toLowerCase(),
                        substring = searchbar.value.toLowerCase();
                    var index = string.indexOf(substring);
                    if (index != -1) {
                        console.log(entry)
                        this.recipesSearch.push(entry)
                        console.log(this.recipesSearch)
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
                }
            );
        }

        if (e.target.checked) {
            this.recipesAllCheck = true;
            this.recipesAllergCheck = false;
            this.recipesBioCheck = false;
        }

        this.recipesAllCheck = true;
        this.recipesAllergCheck = false;
        this.recipesBioCheck = false;
    }

    getBioProducts(e) {
        if (e.target.checked) {
            // console.log(this.foodsBio = this.server.getAlimentsBio().responseText);
            // this.foodsBio = JSON.parse(this.server.getAlimentsBio().responseText);

            this.server.getRecipesBio()
                .subscribe(data => {
                        this.recipesBio = data;
                    }, err => {
                        console.log(err);
                    }
                );
        }

        if (e.target.checked) {
            this.recipesAllCheck = false;
            this.recipesAllergCheck = false;
            this.recipesBioCheck = true;
        }

        this.recipesAllCheck = false;
        this.recipesAllergCheck = false;
        this.recipesBioCheck = true;
    }

    getWithoutAllergensProduct(e) {
        if (e.target.checked) {
            // console.log(this.foodsWithoutAlergens = this.server.getAlimentsWithoutAllergens().responseText);
            // this.foodsWithoutAlergens = JSON.parse(this.server.getAlimentsWithoutAllergens().responseText);

            this.server.getRecipesWithoutAllergens()
                .subscribe(data => {
                        this.recipesWithoutAllergens = data;
                    }, err => {
                        console.log(err);
                    }
                );
        }

        if (e.target.checked) {
            this.recipesAllCheck = false;
            this.recipesAllergCheck = true;
            this.recipesBioCheck = false;
        }

        this.recipesAllCheck = false;
        this.recipesAllergCheck = true;
        this.recipesBioCheck = false;
    }
}
