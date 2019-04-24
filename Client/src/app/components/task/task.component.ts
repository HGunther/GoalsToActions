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

   completeTask(){
     this.task.complete = true;
     
   }

   toggleTaskComplete(){
    this.task.complete = !this.task.complete;
    this.taskService.updateTask(this.task).subscribe();
  }

}
