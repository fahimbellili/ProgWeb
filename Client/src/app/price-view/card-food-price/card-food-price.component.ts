import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ModalComponent} from "../../shared/modal/modal.component";
import {AddPriceModalComponent} from "../add-price-modal/add-price-modal.component";

@Component({
  selector: 'app-card-food-price',
  templateUrl: './card-food-price.component.html',
  styleUrls: ['./card-food-price.component.css']
})
export class CardFoodPriceComponent implements OnInit {
    @Input() food: any[];
    modalRef: BsModalRef;

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

}
