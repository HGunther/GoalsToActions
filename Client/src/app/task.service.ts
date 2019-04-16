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
  private tasksUrl = '/api/tasks'; // URL to web api


  /** GET tasks from the server */
  getTasks (): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }
  

  getTask(id: number): Observable < Task > {
    // TODO: send the message _after_ fetching the task
    this.messageService.add(`TaskService: fetched task id=${id}`);
    return of(TASKS.find(task => task.id === id));
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
