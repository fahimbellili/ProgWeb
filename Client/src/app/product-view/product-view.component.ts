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

    foodsAll: Observable<any>;
    foodsBio: Observable<any>;
    foodsWithoutAllergens: Observable<any>;

    foodsList: any;

    foodBoolAll = false;
    foodBoolBio = false;
    foodBoolAllerg = false;
    foodsAllCheck = false;
    foodsBioCheck = false;
    foodsAllergCheck = false;

    constructor(public server: Server,
                private http: HttpClient,
                private spinner: NgxSpinnerService) {
    }

    ngOnInit() {

        this.server.getAllProducts()
            .subscribe(data => {
                    this.foodsAll = data;
                    // this.foodsList = data;
                }, err => {
                    console.log(err);
                }
            );
        this.foodBoolAll = true;
        this.foodsAllCheck = true;
    }

    onEnterKey(event: any) {

    }

    getAllProducts(e) {
        if (e.target.checked) {
            this.server.getAllProducts()
                .subscribe(data => {
                        this.foodsAll = data;
                        // this.foodsList = data;
                    }, err => {
                        console.log(err);
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
            // console.log(this.foodsBio = this.server.getAlimentsBio().responseText);
            // this.foodsBio = JSON.parse(this.server.getAlimentsBio().responseText);

            this.server.getAllAlimentsBio()
                .subscribe(data => {
                        this.foodsBio = data;
                    }, err => {
                        console.log(err);
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


}
