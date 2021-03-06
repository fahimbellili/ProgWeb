import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {NavbarComponent} from './navbar/navbar.component';
import {Server} from '../../providers/server';
import {HttpClientModule} from '@angular/common/http';
import {ProductViewComponent} from './product-view/product-view.component';
import {RouterModule, Routes} from '@angular/router';
import {RecipeViewComponent} from './recipe/recipe-view/recipe-view.component';
import {FoodCardComponent} from './shared/food-card/food-card.component';
import {ModalModule} from 'ngx-bootstrap';
import {ModalComponent} from './shared/modal/modal.component';

import {PriceViewComponent} from './price-view/price-view.component';
import {AddPriceModalComponent} from './price-view/add-price-modal/add-price-modal.component';

import {RecipeCardComponent} from './recipe/recipe-card/recipe-card.component';
import {RecipeModalComponent} from './recipe/recipe-modal/recipe-modal.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerComponent, NgxSpinnerModule} from 'ngx-spinner';
import {MatCheckboxModule, MatGridListModule, MatCardModule, MatSnackBarModule} from '@angular/material';
import {AddRecipeViewComponent} from './recipe/add-recipe-view/add-recipe-view.component';
import {SelectRecipeCardComponent} from './recipe/select-recipe-card/select-recipe-card.component';
import {RecipeItemsService} from '../../providers/recipe-items.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const appRoutes: Routes = [
    {path: 'product', component: ProductViewComponent},
    {path: 'recipe', component: RecipeViewComponent},
    {path: '', component: ProductViewComponent},
    {path: 'price', component: PriceViewComponent},
    {path: 'addRecipe', component: AddRecipeViewComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProductViewComponent,
        RecipeViewComponent,
        AddRecipeViewComponent,
        FoodCardComponent,
        ModalComponent,
        PriceViewComponent,
        AddPriceModalComponent,
        RecipeModalComponent,
        RecipeCardComponent,
        SelectRecipeCardComponent,
        ModalComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        FormsModule,
        MatGridListModule,
        MatCardModule,
        MatSnackBarModule,
        MatCheckboxModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        ModalModule.forRoot(),
        NgxPaginationModule,
        NgxSpinnerModule,
        MatProgressSpinnerModule
    ],
    providers: [Server, RecipeItemsService],
    bootstrap: [AppComponent],
    entryComponents: [ModalComponent, AddPriceModalComponent, RecipeModalComponent]
})
export class AppModule {
}
