import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SellerComponent } from './component/seller/seller.component';
import { SellerAddProductComponent } from './component/seller-add-product/seller-add-product.component';
import { SearchComponent } from './component/search/search.component';
import { TrendingComponent } from './component/trending/trending.component';
import { CategoryComponent } from './component/category/category.component';
import { CategoriesComponent } from './component/categories/categories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'story/:id', component: SellerComponent },
  { path: 'add-story', component: SellerAddProductComponent },
  { path: 'results', component: SearchComponent },
  { path: 'trending', component: TrendingComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'null', component: CategoriesComponent },
  { path: '', redirectTo: '/cart', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
