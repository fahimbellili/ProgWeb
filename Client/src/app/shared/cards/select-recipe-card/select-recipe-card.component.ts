import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-recipe-card',
  templateUrl: './select-recipe-card.component.html',
  styleUrls: ['./select-recipe-card.component.scss']
})
export class SelectRecipeCardComponent implements OnInit {

  @Input() food: any;

  constructor() { }

  ngOnInit() {
  }

  addToRecipe(){

  }

}
