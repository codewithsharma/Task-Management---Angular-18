import { Component } from '@angular/core';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private appComponent: AppComponent) {} // Inject AppComponent
  handleShowToast(event: { message: string, type: string }) {
    this.appComponent.showToast(event); // Call AppComponent's showToast with the emitted event data
  }

}
