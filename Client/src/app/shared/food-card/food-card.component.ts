import {Component, Input, OnInit} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Server} from '../../../../providers/server';

@Component({
    selector: 'app-food-card',
    templateUrl: './food-card.component.html',
    styleUrls: ['./food-card.component.scss']
})
export class FoodCardComponent implements OnInit {

    modalRef: BsModalRef;
    @Input() food: any;
    resultReq: any;

    constructor(private modalService: BsModalService, public server: Server) {
    }

    openModal() {
        this.resultReq = JSON.parse(this.server.getProduct(this.food.id).responseText);
        console.log(this.resultReq.result);

        this.modalRef = this.modalService.show(ModalComponent, {
            initialState: {
                title: this.resultReq.result,
                data: {}
            }
        });


    }

    ngOnInit() {
    }

}
