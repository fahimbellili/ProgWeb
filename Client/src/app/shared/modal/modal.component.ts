import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Server} from '../../../../providers/server';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    title;
    score: any;

    constructor(public modalRef: BsModalRef, private server: Server) {
    }

    ngOnInit() {
        this.server.getAllScore(this.title[0]._id).subscribe(data => {
            console.log(data.result[0].score);
            this.score = data.result[0].score;

        });
    }

}
