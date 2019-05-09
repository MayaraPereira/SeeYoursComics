import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { toast } from 'angular2-materialize';
import { Collection } from './collection';
import { Comic } from './comic';
import { User } from './user';

@Injectable()
export class ComicService {

  private comicsUrl:string = "http://localhost:3000/comics";
  private collectionsUrl:string = "http://localhost:3000/collections";

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(this.comicsUrl)
      .pipe(catchError(this.handleError('getComics', [])));
  }
  getComic(id: number): Observable<Comic> {
    const url = `${this.comicsUrl}/${id}`;
    return this.http.get<Comic>(url)
      .pipe(catchError(this.handleError<Comic>(`getComic id=${id}`)));
  }
  post(comic: Comic): Observable<Comic> {
  return this.http.post<Comic>(this.comicsUrl, comic, this.httpOptions)
    .pipe(catchError(this.handleError<Comic>('addComic')));
  }
  update(comic: Comic): Observable<any> {
    const url = `${this.comicsUrl}/${comic.id}`;
    return this.http.put(url, comic, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateComic')));
  }
  delete(comic: Comic) : Observable<Comic> {
    const url = `${this.comicsUrl}/${comic.id}`;
    return this.http.delete<Comic>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Comic>('deleteComic')));
  }

  //Collection
  postCollection(collection: Collection): Observable<Collection> {
    return this.http.post<Collection>(this.collectionsUrl, collection, this.httpOptions)
      .pipe(catchError(this.handleError<Collection>('addCollection')));
  }

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.collectionsUrl)
      .pipe(catchError(this.handleError('getCollections', [])));
  }

  getCollection(id: number): Observable<Collection> {
    const url = `${this.collectionsUrl}/${id}`;
    return this.http.get<Collection>(url)
      .pipe(catchError(this.handleError<Collection>(`getCollection id=${id}`)));
  }

  deleteCollection(collection: Collection) : Observable<Collection> {
    const url = `${this.collectionsUrl}/${collection.id}`;
    return this.http.delete<Collection>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Collection>('deleteCollection')));
  }

  //User
  getUser(user_name:string): Observable<User>{
    const url = `${this.comicsUrl}/user?user_name=${user_name}`;
    console.log(url);
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUser`)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // better job of transforming error for user consumption
      toast(`${operation} failed: ${error.message}`, 4000);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
