import { Injectable } from '@angular/core';
import {  Observable,  of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {  HttpClient,  HttpHeaders} from '@angular/common/http';

import {  Task} from './task';
import {  TASKS} from './mock-tasks';

import {  MessageService} from './message.service';

@Injectable({  providedIn: 'root'})
export class TaskService {

  constructor(private http: HttpClient,
    private messageService: MessageService) {}

  /** Log a TaskService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }

  // private tasksUrl = 'http://localhost:3000/tasks'; // URL to web api
  private serverUrl = '/api'; // URL to web api


  /** GET tasks from the server */
  getTasks (): Observable<Task[]> {
    const url = `${this.serverUrl}/tasks`;
    return this.http.get<Task[]>(url)
      .pipe(
        tap(_ => this.log("fetched tasks")),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }
  

/** GET task by id. Will 404 if id not found */
getTask(id: string): Observable<Task> {
  const url = `${this.serverUrl}/task?id=${id}`;
  return this.http.get<Task>(url).pipe(
    tap(_ => this.log(`fetched task id=${id}`)),
    catchError(this.handleError<Task>(`getTask id=${id}`))
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

}
