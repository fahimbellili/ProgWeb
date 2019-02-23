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
    defaultUrl = 'https://static.thenounproject.com/png/220984-200.png';

    constructor(private modalService: BsModalService, public server: Server) {
    }

    ngOnInit() {
    }

    openModal() {
        this.server.getAllProductId(this.food.id).subscribe(data => {

            this.resultReq = data;
            this.modalRef = this.modalService.show(ModalComponent, {
                initialState: {
                    title: this.resultReq.result,
                    data: {}
                }
            });

        });


    }

    getImgUrl() {
        const o = this.food;
        let url = this.defaultUrl;
        if (o.images.hasOwnProperty('front_fr')) {
            let id;
            if (o.id.length === 13) {
                id = o.id.substring(0, 3) + '/' + o.id.substring(3, 6) + '/' + o.id.substring(6, 9) + '/' + o.id.substring(9, 13);
            } else {
                id = o.id;
            }
            url = 'https://static.openfoodfacts.org/images/products/' + id + '/front_fr.' + o.images['front_fr'].rev + '.200.jpg';
        }
        return url;
    }


}
