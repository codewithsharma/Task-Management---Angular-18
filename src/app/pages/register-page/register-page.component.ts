import { Component } from '@angular/core';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  
  constructor(private appComponent: AppComponent) {} // Inject AppComponent
  handleShowToast(event: { message: string, type: string }) {
    this.appComponent.showToast(event); // Call AppComponent's showToast with the emitted event data
  }
}
