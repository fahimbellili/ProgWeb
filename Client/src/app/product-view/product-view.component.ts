import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../recipe/recipe';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Server} from '../../../providers/server';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

    constructor(public server: Server,
                private http: HttpClient,
                private spinner: NgxSpinnerService) {
    }

    foods: Observable<any>;

    ngOnInit() {

        this.server.getAllProducts().subscribe(
            data => {
                this.foods = data;
            }
        );
    }

    onEnterKey(event: any) {

    }

}
