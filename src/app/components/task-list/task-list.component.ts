import { Component } from '@angular/core';
import { TaskCardComponent } from "../task-card/task-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  taskList =[
    {

            id:1,
      title:"hello",
      description :"This is Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore sequi velit eum harum rerum explicabo vero, officiis aliquam quidem ex, optio dignissimos vel pariatur. A voluptas repellat nulla non similique?"
    },
    {
      id:2,
      title:"Task2",
      description :"This is Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore sequi velit eum harum rerum explicabo vero, officiis aliquam quidem ex, optio dignissimos vel pariatur. A voluptas repellat nulla non similique?"
    },
    {
      id:3,
      title:"Task3",
      description :"This is Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore sequi velit eum harum rerum explicabo vero, officiis aliquam quidem ex, optio dignissimos vel pariatur. A voluptas repellat nulla non similique?"
    },

  ]

}
