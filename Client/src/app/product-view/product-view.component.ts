import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Server} from '../../../providers/server';
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef} from "ngx-bootstrap";

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

    foodsAll: any;
    foodsBio: any;
    foodsWithoutAllergens: any;

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

    getAllergensProduct(e) {
        if (e.target.checked) {
            // console.log(this.foodsWithoutAlergens = this.server.getAlimentsWithoutAllergens().responseText);
            // this.foodsWithoutAlergens = JSON.parse(this.server.getAlimentsWithoutAllergens().responseText);

            this.server.getAllAlimentsWithoutAllergens()
                .subscribe(data => {
                        this.foodsWithoutAllergens = data;
                    }, err => {
                        console.log(err);
                    }
                );
        }

        if (e.target.checked) {
            this.foodsAllCheck = false;
            this.foodsAllergCheck = true;
            this.foodsBioCheck = false;
        }

        this.foodBoolAllerg = true;
        this.foodBoolAll = false;
        this.foodBoolBio = false;
    }
}
