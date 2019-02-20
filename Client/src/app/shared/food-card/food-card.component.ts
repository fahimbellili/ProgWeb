import { Component, OnInit } from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss']
})
export class FoodCardComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal() {
    this.modalRef = this.modalService.show(ModalComponent, {
      initialState: {
        title: 'Modal title',
        data: {}
      }
    });
  }

  ngOnInit() {
  }

}
