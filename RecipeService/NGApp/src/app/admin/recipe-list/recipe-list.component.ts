import { Component, OnInit } from '@angular/core';
import { Recipe } from "../../model/Recipe";
import {RecipeService} from "../../service/recipe.service";
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  constructor(private service: RecipeService) { }

  ngOnInit() {
  }
  searchRecipes(term:string):void{
    term = term.trim();
    if (!term) {return;}
    this.service.searchRecipes(term)
    .subscribe(recipes => this.recipes = recipes);
  }
  test(term:string): void {
    alert("hi, " + term);
  }
  delete(recipe: Recipe): void {
    this.service.deleteRecipe(recipe).subscribe(result => { if(result > 0) { recipe.is_deleted = true;}});
  }
}
