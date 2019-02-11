import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Recipe } from '../model/Recipe';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private serviceUrl = '/API/Recipes';  // URL to web api
  constructor(    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET recipes from the server */
  getRecipes (): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.serviceUrl)
      .pipe(
        tap(_ => this.log('fetched recipes')),
        catchError(this.handleError('getRecipes', []))
      );
  }

  getRecipeNo404<Data>(id: number): Observable<Recipe> {
    const url = `${this.serviceUrl}/?id=${id}`;
    return this.http.get<Recipe[]>(url)
      .pipe(
        map(recipes => recipes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} recipe id=${id}`);
        }),
        catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
      );
  }

  /** GET recipe by id. Will 404 if id not found */
  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap(_ => this.log(`fetched recipe id=${id}`)),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  
  /* GET recipes latest updated */
  getLatest(refreshTime: Date): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.serviceUrl}/GetLatest?refreshTime=${refreshTime}`).pipe(
      tap(_ => this.log(`get recipes updated after "${refreshTime}"`)),
      catchError(this.handleError<Recipe[]>('getLatest', []))
    );
  }
  /* GET recipes whose title contains search term */
  searchRecipes(term: string): Observable<Recipe[]> {
    if (!term.trim()) {
      // if not search term, return empty recipe array.
      return of([]);
    }
    return this.http.get<Recipe[]>(`${this.serviceUrl}/Search?terms=${term}`).pipe(
      tap(_ => this.log(`found recipes matching "${term}"`)),
      catchError(this.handleError<Recipe[]>('searchRecipes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new recipe to the server */
  addRecipe (recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.serviceUrl, recipe, httpOptions).pipe(
      tap((recipe: Recipe) => this.log(`added recipe w/ id=${recipe.recipe_id}`)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  /** DELETE: delete the recipe from the server */
  deleteRecipe (recipe: Recipe | number): Observable<number> {
    const id = typeof recipe === 'number' ? recipe : recipe.recipe_id;
    const url = `${this.serviceUrl}/${id}`;

    return this.http.delete<number>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted recipe id=${id}`)),
      catchError(this.handleError<number>('deleteRecipe'))
    );
  }

  /** PUT: update the recipe on the server */
  updateRecipe (recipe: Recipe): Observable<any> {
    return this.http.put(this.serviceUrl, recipe, httpOptions).pipe(
      tap(_ => this.log(`updated recipe id=${recipe.recipe_id}`)),
      catchError(this.handleError<any>('updaterecipe'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a recipeService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RecipeService: ${message}`);
  }
}

