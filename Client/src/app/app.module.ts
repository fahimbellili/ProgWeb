import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {NavbarComponent} from './navbar/navbar.component';
import {Server} from "../../providers/server";
import {HttpClientModule} from "@angular/common/http";
import {ProductViewComponent} from './product-view/product-view.component';
import {RouterModule, Routes} from "@angular/router";
import {RecipeViewComponent} from "./recipe-view/recipe-view.component";
import {FoodCardComponent} from './shared/food-card/food-card.component';
import {ModalModule} from "ngx-bootstrap";
import {ModalComponent} from './shared/modal/modal.component';
import { PriceViewComponent } from './price-view/price-view.component';
import { CardFoodPriceComponent } from './price-view/card-food-price/card-food-price.component';
import { AddPriceModalComponent } from './price-view/add-price-modal/add-price-modal.component';

const appRoutes: Routes = [
    {path: 'product', component: ProductViewComponent},
    {path: 'recipe', component: RecipeViewComponent},
    {path: '', component: ProductViewComponent},
    {path: 'price', component: PriceViewComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProductViewComponent,
        RecipeViewComponent,
        FoodCardComponent,
        ModalComponent,
        PriceViewComponent,
        CardFoodPriceComponent,
        AddPriceModalComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        ModalModule.forRoot()
    ],
    providers: [Server],
    bootstrap: [AppComponent],
    entryComponents: [ModalComponent, AddPriceModalComponent]
})
export class AppModule {
}
