import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecipeComponent } from './admin/recipe/recipe.component';
import { RecipeListComponent } from './admin/recipe-list/recipe-list.component';
import { RecipeIngredientsComponent } from './admin/recipe-ingredients/recipe-ingredients.component';
import { IngredientComponent } from './admin/ingredient/ingredient.component';
import { AppRoutingModule } from './/app-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeIngredientsComponent,
    IngredientComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
