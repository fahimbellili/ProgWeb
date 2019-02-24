import {Component, Injectable, Input, OnInit} from '@angular/core';
import {RecipeItemsService} from "../../../../providers/recipe-items.service";

@Component({
    selector: 'app-select-recipe-card',
    templateUrl: './select-recipe-card.component.html',
    styleUrls: ['./select-recipe-card.component.scss']
})
@Injectable()
export class SelectRecipeCardComponent implements OnInit {

    @Input() food: any;

    private recipeItems: any[] = [];
    defaultUrl = 'https://static.thenounproject.com/png/220984-200.png';


    constructor(private recipeItemsService: RecipeItemsService) {
    }

    ngOnInit() {
    }

    addToRecipe(food) {
        this.recipeItems = this.recipeItemsService.getList();
        this.recipeItems.push(food);
        this.recipeItemsService.setList(this.recipeItems);
    }

    getImgUrl() {
        const foodObj = this.food;
        let url = this.defaultUrl;
        if ((foodObj.hasOwnProperty('images'))) {
            if ((foodObj.images.hasOwnProperty('front_fr'))) {
                let id;
                if (foodObj.id.length === 13) {
                    id = foodObj.id.substring(0, 3) + '/' + foodObj.id.substring(3, 6) + '/' + foodObj.id.substring(6, 9) + '/' + foodObj.id.substring(9, 13);
                } else {
                    id = foodObj.id;
                }
                url = 'https://static.openfoodfacts.org/images/products/' + id + '/front_fr.' + foodObj.images['front_fr'].rev + '.200.jpg';

            } else {
                url = this.defaultUrl;
            }

        } else {
            url = this.defaultUrl;
        }
        return url;
    }
}
