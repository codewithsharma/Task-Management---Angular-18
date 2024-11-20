import { Component } from '@angular/core';
import { TaskFormComponent } from "../../components/task-form/task-form.component";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [TaskFormComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

}
