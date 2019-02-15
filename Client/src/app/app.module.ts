import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {NavbarComponent} from './navbar/navbar.component';
import {Server} from "../../providers/server";
import {HttpClientModule} from "@angular/common/http";
import {ProductViewComponent} from './product-view/product-view.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProductViewComponent,
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [Server],
    bootstrap: [AppComponent]
})
export class AppModule {
}
