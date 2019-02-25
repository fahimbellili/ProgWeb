import {Component, Injectable, OnInit} from '@angular/core';
import {Server} from '../../../../providers/server';
import {HttpClient} from '@angular/common/http';
import {RecipeItemsService} from '../../../../providers/recipe-items.service';

@Component({
    selector: 'app-add-recipe-view',
    templateUrl: './add-recipe-view.component.html',
    styleUrls: ['./add-recipe-view.component.scss']
})

@Injectable()
export class AddRecipeViewComponent implements OnInit {

    foodsAll;
    foodsSearch: any[] = [];
    foodsBio: any;
    foodsWithoutAllergens: any;
    p;
    foodBoolAll = false;
    foodBoolBio = false;
    foodBoolAllerg = false;
    foodBoolSearch = false;
    foodsAllCheck = false;
    foodsBioCheck = false;
    foodsAllergCheck = false;
    recipeItems: any[] = [];
    isLoading = false;

    constructor(public server: Server,
                private http: HttpClient,
                private recipeItemsService: RecipeItemsService) {
        this.recipeItemsService.setList(this.recipeItems);
    }

    ngOnInit() {

        this.server.getAllProducts().subscribe(
            data => {
                this.foodsAll = data;
                this.isLoading = true;
            }
        );

        this.foodBoolAll = true;
        this.foodsAllCheck = true;
    }


    addRecipe(name) {
        this.recipeItems = this.recipeItemsService.getList();
        let obj = {
            name: name.value,
            ingredients: this.recipeItems,
        };

        (async () => {
            const response = await fetch('https://offserver2019.herokuapp.com/addRecipe', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(obj)
            });
            const content = await response.json();
        })();
        let list: any[] = [];
        this.recipeItemsService.setList(list);
        this.recipeItems = this.recipeItemsService.getList();
    }

    deleteItem(index) {
        this.recipeItems = this.recipeItemsService.getList();
        this.recipeItems.splice(index, 1);
        this.recipeItemsService.setList(this.recipeItems);
    }

    onEnterKey(event: any, searchbar) {
        if (searchbar.value == '') {
            this.foodsSearch = [];
            this.server.getAllProducts()
                .subscribe(data => {
                        this.foodsAll = data;
                        // this.foodsList = data;
                    }, err => {
                    }
                );
            this.foodBoolAll = true;
            this.foodsAllCheck = true;
        } else {
            let listToParse;
            this.foodsSearch = [];
            if (this.foodsBioCheck) {
                listToParse = this.foodsBio;
                this.foodBoolBio = false;
                this.foodBoolSearch = true;
            }
            if (this.foodsAllergCheck) {
                listToParse = this.foodsWithoutAllergens;
                this.foodBoolAllerg = false;
                this.foodBoolSearch = true;
            }
            if (this.foodsAllCheck) {
                listToParse = this.foodsAll;
                this.foodBoolAll = false;
                this.foodBoolSearch = true;
            }
            try {
                for (let entry of listToParse.result) {
                    var string = entry.name.toLowerCase(),
                        substring = searchbar.value.toLowerCase();
                    var index = string.indexOf(substring);
                    if (index != -1) {
                        this.foodsSearch.push(entry);
                    }
                }
            } catch (e) {
            }
        }
    }

    getAllProducts(e) {
        if (e.target.checked) {
            this.server.getAllProducts()
                .subscribe(data => {
                        this.foodsAll = data;
                        // this.foodsList = data;
                    }, err => {
                    }
                );
        }

        if (e.target.checked) {
            this.foodsAllCheck = true;
            this.foodsAllergCheck = false;
            this.foodsBioCheck = false;
        }

        this.foodBoolAll = true;
        this.foodBoolBio = false;
        this.foodBoolAllerg = false;
    }

    getBioProducts(e) {
        if (e.target.checked) {

            this.server.getAllAlimentsBio()
                .subscribe(data => {
                        this.foodsBio = data;
                    }, err => {
                    }
                );
        }

        if (e.target.checked) {
            this.foodsAllCheck = false;
            this.foodsAllergCheck = false;
            this.foodsBioCheck = true;
        }

        this.foodBoolBio = true;
        this.foodBoolAll = false;
        this.foodBoolAllerg = false;
    }

    getWithoutAllergensProduct(e) {
        if (e.target.checked) {

            this.server.getAllAlimentsWithoutAllergens()
                .subscribe(data => {
                        this.foodsWithoutAllergens = data;
                    }, err => {

                    }
                );
        }

        if (e.target.checked) {
            this.foodsAllCheck = false;
            this.foodsAllergCheck = true;
            this.foodsBioCheck = false;
        }

        this.foodBoolAllerg = true;
        this.foodBoolAll = false;
        this.foodBoolBio = false;
    }

}

