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
        const o = this.food;
        let url = this.defaultUrl;
        if (o.images.hasOwnProperty('front_fr')) {
            let id;
            if (o.id.length === 13) {
                id = o.id.substring(0, 3) + '/' + o.id.substring(3, 6) + '/' + o.id.substring(6, 9) + '/' + o.id.substring(9, 13);
            } else {
                id = o.id;
            }
            url = 'https://static.openfoodfacts.org/images/products/' + id + '/front_fr.' + o.images['front_fr'].rev + '.200.jpg';
        }
        return url;
    }
}
