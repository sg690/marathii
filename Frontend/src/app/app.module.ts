import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { SellerComponent } from './component/seller/seller.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerAddProductComponent } from './component/seller-add-product/seller-add-product.component'; 
import { SearchComponent } from './component/search/search.component';
import { FooterComponent } from './component/footer/footer.component';
import { CategoryComponent } from './component/category/category.component';
import { TrendingComponent } from './component/trending/trending.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CategoriesComponent } from './component/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SellerComponent,
    SellerAddProductComponent,
    SearchComponent,
    FooterComponent,
    TrendingComponent,
    CategoryComponent,
    SidebarComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
