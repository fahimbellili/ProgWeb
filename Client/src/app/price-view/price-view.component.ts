import {Component, OnInit} from '@angular/core';

import * as L from 'leaflet';
import {Server} from '../../../providers/server';

@Component({
    selector: 'app-price-view',
    templateUrl: './price-view.component.html',
    styleUrls: ['./price-view.component.scss']
})

export class PriceViewComponent implements OnInit {

    myFoodyMap: any;
    foods = [];
    prices = [];
    isLoading = false;

    constructor(public server: Server) {
    }

    ngOnInit() {
        this.server.getAllProducts().subscribe(
            data => {
                this.foods = data.result;
                this.isLoading = true;
            }
        );
        this.server.getAllPrices().subscribe(
            data => {
                this.prices = data.result;
                this.loadmap();
            }
        );

    }

    loadmap() {
        this.myFoodyMap = L.map('foodymap').fitWorld();

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: 'Foody Map'
        }).addTo(this.myFoodyMap);
        this.myFoodyMap.locate({
            setView: true,
            maxZoom: 12
        }).on('locationerror', (err) => {
        });
        var monIcone = L.icon({
            iconUrl: 'https://image.flaticon.com/icons/svg/126/126083.svg',
            iconSize: [40, 40],
        });
        for (var i = 0; i < this.prices.length; i++) {
            var current = this.prices[i];
            var popup = L.popup();
            var customPopup = 'Magasin : ' + current.shop + ' / ' + 'Prix : ' + current.price + ' / ' + 'Produit : ' + current.nameOfProduct;
            L.marker([current.lat, current.long], {icon: monIcone}).bindPopup(customPopup).addTo(this.myFoodyMap);
        }
    }
}
