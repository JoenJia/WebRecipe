import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from "../../model/Recipe";
import { RecipeService } from "../../service/recipe.service";
import { CategoryService } from "../../service/category.service";
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { JsonPointer } from 'angular6-json-schema-form';
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
  jsonFormSchema : string;
  jsonFormValid = false;
  jsonFormStatusMessage = 'Loading form...';
  jsonFormObject: any;
  jsonFormOptions: any = {
    addSubmit: true, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: true, // Load external css and JavaScript for frameworks
    returnEmptyFields: false, // Don't return values for empty input fields
    setSchemaDefaults: true, // Always use schema defaults for empty fields
    defautWidgetOptions: { feedback: true }, // Show inline feedback icons
  };
  liveFormData: any = {};
  formValidationErrors: any;
  formIsValid = null;
  submittedFormData: any = null;
  aceEditorOptions: any = {
    highlightActiveLine: true,
    maxLines: 1000,
    printMargin: false,
    autoScrollEditorIntoView: true,
  };
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
      .subscribe(cats => {this.categories = cats; this.loadForm();});
  }
  loadRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getRecipe(id)
      .subscribe(recipe => {this.recipe = recipe; this.loadCategories();});
  }
  saveRecipe() : void {
    this.service.updateRecipe(this.recipe).subscribe();
  }
  loadForm(){
    const formURL = `assets/form-schema/recipe.json`;
    this.http
    .get(formURL, { responseType: 'text' })
    .subscribe(schema => {
      this.jsonFormSchema = schema;
      this.generateForm(this.jsonFormSchema);
    });
  }
  generateForm(newFormString: string) {
    if (!newFormString) { return; }
    this.jsonFormStatusMessage = 'Loading form...';
    this.formActive = false;
    this.liveFormData = this.recipe;
    this.submittedFormData = null;

    // Most examples should be written in pure JSON,
    // but if an example schema includes a function,
    // it will be compiled it as Javascript instead
    try {

      // Parse entered content as JSON
      this.jsonFormObject = JSON.parse(newFormString);
      let titleMapStr: string = "{";
      let start : boolean = true;
      this.categories.forEach(element => {
        //category enum values
        this.categoryEnum.push(element.category_id);
        //category enum value-title map
        if (!start)
        {
          titleMapStr += ',';
        }
        else{
          start = false;
        }
        titleMapStr += '"' + element.category_id.toString() + '":"' + element.category_name +'"';  
        //this.titleMap.push({element.category_id: element.category_name} );
      });
      titleMapStr += "}";
      this.jsonFormObject.schema.properties["category_id"].enum = this.categoryEnum;
      this.jsonFormObject.form.find(x => x.key=="category_id").titleMap = JSON.parse(titleMapStr);
      this.jsonFormObject.data = this.recipe;
      this.jsonFormValid = true;
    } catch (jsonError) {
      try {

        // If entered content is not valid JSON,
        // parse as JavaScript instead to include functions
        const newFormObject: any = null;
        /* tslint:disable */
        eval('newFormObject = ' + newFormString);
        /* tslint:enable */
        this.jsonFormObject = newFormObject;
        this.jsonFormValid = true;
      } catch (javascriptError) {

        // If entered content is not valid JSON or JavaScript, show error
        this.jsonFormValid = false;
        this.jsonFormStatusMessage =
          'Entered content is not currently a valid JSON Form object.\n' +
          'As soon as it is, you will see your form here. So keep typing. :-)\n\n' +
          'JavaScript parser returned:\n\n' + jsonError;
        return;
      }
    }
    this.formActive = true;
  }

  onSubmit(data: any) {
    this.submittedFormData = data;
  }

  get prettySubmittedFormData() {
    return JSON.stringify(this.submittedFormData, null, 2);
  }

  onChanges(data: any) {
    this.liveFormData = data;
  }

  get prettyLiveFormData() {
    return JSON.stringify(this.liveFormData, null, 2);
  }

  isValid(isValid: boolean): void {
    this.formIsValid = isValid;
  }

  validationErrors(data: any): void {
    this.formValidationErrors = data;
  }

  get prettyValidationErrors() {
    if (!this.formValidationErrors) { return null; }
    const errorArray = [];
    for (const error of this.formValidationErrors) {
      const message = error.message;
      const dataPathArray = JsonPointer.parse(error.dataPath);
      if (dataPathArray.length) {
        let field = dataPathArray[0];
        for (let i = 1; i < dataPathArray.length; i++) {
          const key = dataPathArray[i];
          field += /^\d+$/.test(key) ? `[${key}]` : `.${key}`;
        }
        errorArray.push(`${field}: ${message}`);
      } else {
        errorArray.push(message);
      }
    }
    return errorArray.join('<br>');
  }
}
