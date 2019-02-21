import { Component, OnInit } from '@angular/core';
import {Server} from "../../../providers/server";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-recipe-view',
  templateUrl: './add-recipe-view.component.html',
  styleUrls: ['./add-recipe-view.component.scss']
})
export class AddRecipeViewComponent implements OnInit {

  constructor(public server: Server,
              private http: HttpClient) {
  }

  foods: any[];

  ngOnInit() {
    this.foods = JSON.parse(this.server.getAll().responseText);
  }

  onEnterKey(event: any) {

  }

}
