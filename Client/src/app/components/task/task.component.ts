import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../../task';
import { TaskService }  from '../../services/task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}
  

  ngOnInit(): void { 
   }

   completeTask(): void {
     this.task.complete = true;
     this.task.date_completed = new Date(Date.now());
     this.taskService.updateTask(this.task).subscribe();
   }

   toggleTaskComplete(): void {
    if (this.task.complete){
      this.task.complete = false;
      this.task.date_completed = new Date();
    } else{
      this.task.complete = true;
      this.task.date_completed = new Date(Date.now());
    }
    this.taskService.updateTask(this.task).subscribe();
  }

}
