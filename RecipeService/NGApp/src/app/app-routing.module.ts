import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {RecipeListComponent} from './admin/recipe-list/recipe-list.component';
import {RecipeComponent} from './admin/recipe/recipe.component';
import {RecipeIngredientsComponent} from './admin/recipe-ingredients/recipe-ingredients.component';
import {IngredientComponent} from './admin/ingredient/ingredient.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'ingredients/:recipe_id', component: RecipeIngredientsComponent },
  { path: 'ingredient/:id', component: IngredientComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
