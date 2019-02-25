import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Server} from "../../../../providers/server";
import {ModalComponent} from "../../shared/modal/modal.component";
import {MatSnackBar} from "@angular/material";


@Component({
    selector: 'app-recipe-modal',
    templateUrl: './recipe-modal.component.html',
    styleUrls: ['./recipe-modal.component.scss']
})
export class RecipeModalComponent implements OnInit {

    title;
    comments;
    prices;
    recipePrice;
    cptNot;

    constructor(public modalRef: BsModalRef, private snackBar: MatSnackBar, private modalService: BsModalService, public server: Server) {

    }

    ngOnInit() {
        this.server.getComments(this.title.id).subscribe(
            data => {
                this.comments = data.result;
            }
        );

        this.server.getAllPrices().subscribe(data => {
            let totalPrice: number = 0;
            this.prices = data.result;
            let cptNot: number = 0;
            for (let ing of this.title.ingredients) {
                let cpt: number = 0;
                let tmpPrice: number = 0;
                for (let price of this.prices) {
                    if (price.idOfProduct == ing.id) {
                        tmpPrice += +price.price;
                        cpt++;
                    }
                }
                if (cpt > 0) totalPrice += tmpPrice / cpt;
                else {
                    cptNot++;
                }
            }
            this.recipePrice=Math.round( totalPrice * 100) / 100;
            this.cptNot=cptNot;
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
