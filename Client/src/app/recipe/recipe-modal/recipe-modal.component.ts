import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Server} from "../../../../providers/server";
import {ModalComponent} from "../../shared/modal/modal.component";
import {MatSnackBar} from "@angular/material";


@Component({
    selector: 'app-recipe-modal',
    templateUrl: './recipe-modal.component.html',
    styleUrls: ['./recipe-modal.component.css']
})
export class RecipeModalComponent implements OnInit {

    title;
    comments;
    productDetails;

    constructor(public modalRef: BsModalRef, private snackBar: MatSnackBar, private modalService: BsModalService, public server: Server) {

    }

    ngOnInit() {
        this.server.getComments(this.title.id).subscribe(
            data => {
                this.comments = data.result;
            }
        );
    }

    openDetails(product) {
        this.productDetails = JSON.parse(this.server.getProduct(product.id).responseText);
        console.log(this.productDetails.result)
        this.modalRef = this.modalService.show(ModalComponent, {
            initialState: {
                title: this.productDetails.result,
                data: {}
            }
        });
    }

    sendComment(pseudo, comment) {
        let obj = {
            pseudoUser: pseudo.value,
            idRecipe: this.title.id,
            content: comment.value
        };

        (async () => {
            const response = await fetch('https://offserver2019.herokuapp.com/addComment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(obj)
            });
            const content = await response.json();
        })();
        this.closeModal();
        this.openSnackBar();


    }

    closeModal() {
        this.modalRef.hide();
    }

    openSnackBar() {
        this.snackBar.open("Merci pour votre commentaire!", "OK", {
            duration: 2000,
        });
    }
}
