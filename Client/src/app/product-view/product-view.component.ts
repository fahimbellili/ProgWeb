import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../recipe/recipe';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Server} from '../../../providers/server';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

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
