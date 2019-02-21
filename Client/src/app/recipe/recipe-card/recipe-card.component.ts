import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Server} from "../../../../providers/server";
import {RecipeModalComponent} from "../recipe-modal/recipe-modal.component";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() recipe: any;
  resultReq: any;

  constructor(private modalService: BsModalService, public server: Server) {
  }



  openModal() {
    this.resultReq = JSON.parse(this.server.getRecipe(this.recipe.id).responseText);
    this.modalRef = this.modalService.show(RecipeModalComponent, {
      class: 'modal-lg',
      initialState: {
        title: this.resultReq.result[0],
        data: {}
      },
    });

  }

  ngOnInit() {
  }

}
