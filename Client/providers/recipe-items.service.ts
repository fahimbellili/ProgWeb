import { Injectable, Directive} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeItemsService {

  private recipeItems: string[];

  constructor() { }

  setList(val) {
    this.recipeItems = val;
  }

  getList() {
    return this.recipeItems;
  }
}
