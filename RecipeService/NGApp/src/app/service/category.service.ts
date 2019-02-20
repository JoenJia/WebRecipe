import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from '../model/Category';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
 })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private serviceUrl = environment.apiUrl + '/Categories';  // URL to web api
  constructor(    private http: HttpClient,
    private messageService: MessageService) { }
cache:Category[];
  getCategories (): Observable<Category[]> {
    if (this.cache)
    {
      return of(this.cache);
    }
    else{
     return this.http.get<Category[]>(this.serviceUrl)
      .pipe(
        map(categories => this.cache = categories),
        tap(_ => this.log('fetched categories')),
        catchError(this.handleError('getCategories', []))
      );
  }
}
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
