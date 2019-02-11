import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from "../../model/Recipe";
import { RecipeService } from "../../service/recipe.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe;
  constructor(private service: RecipeService, 
    private route: ActivatedRoute, 
    private location: Location) { }

  ngOnInit() {
  }
  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getRecipe(id)
      .subscribe(recipe => this.recipe = recipe);
  }
  saveRecipe() : void {
    this.service.updateRecipe(this.recipe).subscribe();
  }
}
