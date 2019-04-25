import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../../task';
import { TaskService }  from '../../services/task.service';

import * as util from "../../utilities";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  
  isBeingUpdated: boolean;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {
    this.isBeingUpdated = false;
  }
  

  ngOnInit(): void { 
   }

   completeTask(): void {
     this.task.complete = true;
     this.task.date_completed = new Date(Date.now());
     this.isBeingUpdated = true;
     this.taskService.updateTask(this.task).subscribe( () => {this.isBeingUpdated = false;} );
   }

   toggleTaskComplete(): void {
    if (this.task.complete){
      this.task.complete = false;
      this.task.date_completed = new Date();
    } else{
      this.task.complete = true;
      this.task.date_completed = new Date(Date.now());
    }
    this.isBeingUpdated = true;
    this.taskService.updateTask(this.task).subscribe( () => {this.isBeingUpdated = false;} );
  }

  daysUntilDue(dueDate: Date): number {
    var dif = new Date(this.task.date_due).getTime() - Date.now();
    return util.convertMiliseconds(dif, 'd');
  }

}
