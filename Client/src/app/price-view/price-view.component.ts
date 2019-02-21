import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as L from 'leaflet';
import {Server} from "../../../providers/server";


@Component({
    selector: 'app-price-view',
    templateUrl: './price-view.component.html',
    styleUrls: ['./price-view.component.css']
})
export class PriceViewComponent implements OnInit {

    @ViewChild('map') mapContainer: ElementRef;
    map: any;
    foods = [];
    prices = [];


    constructor(public server: Server) {
    }


    ngOnInit() {
        this.server.getAllProducts().subscribe(
            data => {
                this.foods = data.result;
            }
        );
        this.prices = JSON.parse(this.server.getAllPrices().responseText).result;
        console.log(this.prices);
        if (this.map) {
            this.map.remove();
        }
        this.loadmap();
    }

    loadmap() {
        this.map = L.map("map").fitWorld();
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 30
        }).addTo(this.map);
        this.map.locate({
            setView: true,
            maxZoom: 12
        }).on('locationerror', (err) => {
            console.log(err.message);
        });
        var content = new Map();
        var monIcone = L.icon({
            iconUrl: 'https://image.flaticon.com/icons/svg/126/126083.svg',
            iconSize: [40, 40],
        });
        for (var i = 0; i < this.prices.length; i++) {
            var current = this.prices[i];
            var popup = L.popup();
            var customPopup = "Magasin : " + current.shop + " / " + "Price : " + current.price;
            L.marker([current.lat, current.long], {icon: monIcone}).bindPopup(customPopup).addTo(this.map);

        }


    }
}
