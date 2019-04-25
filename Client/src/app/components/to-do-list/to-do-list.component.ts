import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getToDo().subscribe(tasks => this.tasks = tasks);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    var task = new Task;
    task.title = title;
    this.taskService.addTask(task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t != task);
    this.taskService.deleteTask(task).subscribe();
  }
  

}
