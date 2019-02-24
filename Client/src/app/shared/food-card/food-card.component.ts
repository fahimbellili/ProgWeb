import {Component, Input, OnInit} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Server} from '../../../../providers/server';
import {AddPriceModalComponent} from '../../price-view/add-price-modal/add-price-modal.component';
import {NgxSpinnerService} from 'ngx-spinner';

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

    constructor(private modalService: BsModalService, public server: Server, private spinner: NgxSpinnerService) {
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

    openModalAddPrince(food) {
        this.modalRef = this.modalService.show(AddPriceModalComponent, {
            initialState: {
                title: 'Modal title',
                idProduct: food.id,
                productName: food.name
            }
        });
    }

    getImgUrl() {
        const foodObj = this.food;
        let url = this.defaultUrl;
        if ((foodObj.hasOwnProperty('images'))) {
            if ((foodObj.images.hasOwnProperty('front_fr'))) {
                let id;
                if (foodObj.id.length === 13) {
                    id = foodObj.id.substring(0, 3) + '/' + foodObj.id.substring(3, 6) + '/' + foodObj.id.substring(6, 9) + '/' + foodObj.id.substring(9, 13);
                } else {
                    id = foodObj.id;
                }
                url = 'https://static.openfoodfacts.org/images/products/' + id + '/front_fr.' + foodObj.images['front_fr'].rev + '.200.jpg';

            } else {
                url = this.defaultUrl;
            }

        } else {
            url = this.defaultUrl;
        }
        return url;
    }
}
