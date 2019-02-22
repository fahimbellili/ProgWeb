import {Component, Injectable, OnInit} from '@angular/core';
import {Server} from "../../../../providers/server";
import {HttpClient} from "@angular/common/http";
import {RecipeItemsService} from "../../../../providers/recipe-items.service";

@Component({
  selector: 'app-add-recipe-view',
  templateUrl: './add-recipe-view.component.html',
  styleUrls: ['./add-recipe-view.component.scss']
})

@Injectable()
export class AddRecipeViewComponent implements OnInit {

  private recipeItems: any[] = [];

  constructor(public server: Server,
              private http: HttpClient,
              private recipeItemsService: RecipeItemsService) {
    this.recipeItemsService.setList(this.recipeItems);
  }

  foods: any[];

  ngOnInit() {

    this.server.getAllProducts().subscribe(
        data => {
          this.foods = data;
        }
    );
  }

  onEnterKey(event: any) {

  }

  addRecipe(name) {
    this.recipeItems=this.recipeItemsService.getList()
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
    this.recipeItems=this.recipeItemsService.getList();
  }

  deleteItem(index){
    this.recipeItems=this.recipeItemsService.getList();
    this.recipeItems.splice(index, 1);
    this.recipeItemsService.setList(this.recipeItems);
  }


}
