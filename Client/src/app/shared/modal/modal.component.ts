import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Server} from '../../../../providers/server';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    title;
    score: any;
    price: any;


    constructor(public modalRef: BsModalRef, private server: Server) {
    }

    ngOnInit() {
        var i;
        this.server.getAllScore(this.title[0]._id).subscribe(data => {
            this.score = data.result[0].score;

        });

        this.server.getAllPrices().subscribe(data => {
            this.price = data;
        });

    }

}
