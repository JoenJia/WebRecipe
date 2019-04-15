import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from "../../model/Recipe";
import { RecipeService } from "../../service/recipe.service";
import { CategoryService } from "../../service/category.service";
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})

export class RecipeComponent implements OnInit {
  recipe: Recipe;
  categories:Category[];
  titleMap : any[] = [];
  categoryEnum:number[] = [];
  formActive = false;
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  constructor(private service: RecipeService,
    private categoryService: CategoryService, 
    private route: ActivatedRoute, 
    private location: Location,
    private http: HttpClient) { }

  ngOnInit() {
    this.loadRecipe();
  }
  loadCategories(): void {
    this.categoryService.getCategories()
      .subscribe(cats => {this.categories = cats;});
  }
  loadRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getRecipe(id)
      .subscribe(recipe => {this.recipe = recipe; this.loadCategories();});
  }
  saveRecipe() : void {
    this.service.updateRecipe(this.recipe).subscribe();
  }
}
