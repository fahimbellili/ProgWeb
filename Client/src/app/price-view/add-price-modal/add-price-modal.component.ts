import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-add-price-modal',
    templateUrl: './add-price-modal.component.html',
    styleUrls: ['./add-price-modal.component.scss']
})
export class AddPriceModalComponent implements OnInit {

    @Input() data: string;
    idProduct;
    productName;

    constructor(public modalRef: BsModalRef, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
    }

    onClickSubmit(idProduct, productName, data) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }

        function displayLocationInfo(position) {
            const lng = position.coords.longitude;
            const lat = position.coords.latitude;

            function dorequest(data, lat, long) {
                let price = data.price;
                let shop = data.shop;
                let latitude = lat;
                let longitude = long;
                let obj = {
                    price: price,
                    shop: shop,
                    lat: latitude,
                    long: longitude,
                    idOfProduct: idProduct,
                    nameOfProduct: productName
                };

                console.log(JSON.stringify(obj));

                (async () => {
                    const response = await fetch('https://offserver2019.herokuapp.com/addPrice', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        method: 'POST',
                        body: JSON.stringify(obj)
                    });
                    const content = await response.json();

                })();
            }

            dorequest(data, lat, lng);
        }
        this.modalRef.hide();
        this.snackBar.open("Votre prix a été enregistré, merci!", "OK", {
            duration: 2000,
        });
    }
}
