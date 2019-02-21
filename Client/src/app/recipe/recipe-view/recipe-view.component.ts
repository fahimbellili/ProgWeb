import {Component, OnInit} from '@angular/core';
import {Server} from "../../../../providers/server";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {

    constructor(public server: Server,
                private http: HttpClient) {
    }

    recipes: any[];

    ngOnInit() {
        this.server.getAllRecipes().subscribe(
            data => {
                this.recipes = data;
            }
        );
    }


    onEnterKey(event: any) {

    }

}
