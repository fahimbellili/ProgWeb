import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ModalComponent} from "../../shared/modal/modal.component";
import {AddPriceModalComponent} from "../add-price-modal/add-price-modal.component";

@Component({
  selector: 'app-card-food-price',
  templateUrl: './card-food-price.component.html',
  styleUrls: ['./card-food-price.component.scss']
})
export class CardFoodPriceComponent implements OnInit {
    @Input() food: any;
    modalRef: BsModalRef;
    resultReq: any;
    defaultUrl = 'https://static.thenounproject.com/png/220984-200.png';

    constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

    openModal(food) {
        this.modalRef = this.modalService.show(AddPriceModalComponent, {
            initialState: {
                title: 'Modal title',
                idProduct: food.id,
                productName: food.name
            }
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
