import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {Server} from "../../../../providers/server";

@Component({
    selector: 'app-recipe-modal',
    templateUrl: './recipe-modal.component.html',
    styleUrls: ['./recipe-modal.component.css']
})
export class RecipeModalComponent implements OnInit {

    title;
    comments;
    productDetails;

    constructor(public modalRef: BsModalRef, public server: Server) {

    }

    ngOnInit() {
        this.comments = JSON.parse(this.server.getComments(this.title.id).responseText).result;
    }

    openDetails(product) {
        this.productDetails = JSON.parse(this.server.getProduct(product.id).responseText).result;
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

            console.log(content);
        })();

    }

}
