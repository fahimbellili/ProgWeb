import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() recipe: any[];

  constructor(private modalService: BsModalService) {
  }

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
