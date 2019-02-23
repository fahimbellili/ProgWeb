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

    constructor(public modalRef: BsModalRef, private server: Server) {
    }

    ngOnInit() {
    }

}
