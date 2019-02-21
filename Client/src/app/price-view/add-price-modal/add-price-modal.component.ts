import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-add-price-modal',
    templateUrl: './add-price-modal.component.html',
    styleUrls: ['./add-price-modal.component.css']
})
export class AddPriceModalComponent implements OnInit {

    @Input() data: string;

    constructor() {
    }

    ngOnInit() {
    }

    onClickSubmit(idProduct, productName, data) {
        console.log("idProduct : "+idProduct);
        console.log("productName : "+productName);
        console.log("data : ");
        console.log(data);
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

                    console.log(content);
                })();
            }

            dorequest(data, lat, lng);
        }
    }

}
