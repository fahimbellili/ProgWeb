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
import { FoodCardComponent } from './shared/food-card/food-card.component';

const appRoutes: Routes = [
    {path: 'product', component: ProductViewComponent},
    {path: 'recipe', component: RecipeViewComponent},
    {path: '', component: ProductViewComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProductViewComponent,
        RecipeViewComponent,
        FoodCardComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [Server],
    bootstrap: [AppComponent]
})
export class AppModule {
}
