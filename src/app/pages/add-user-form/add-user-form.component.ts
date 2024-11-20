import { Component, EventEmitter, inject, Injectable, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
@Injectable({
  providedIn:"root"
})

export class AddUserFormComponent {
  constructor(private cookieSerive :CookieService){

  }
  http = inject(HttpClient);
  router = inject(Router)
  @Output() showToast = new EventEmitter<{ message: string, type: string }>();

  private formbuilderService = inject(FormBuilder);
  isPasswordMatched = false;
  valid = false;

  registerForm = this.formbuilderService.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    role:["user"],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required]
  });

  isPasswordConfirmed() {
    this.isPasswordMatched = this.registerForm.value.password !== this.registerForm.value.confirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post("http://localhost:4000/users/register", this.registerForm.value)
        .subscribe((res: any) => {
          console.log(res);
          this.cookieSerive.set("token", res.token)
          this.showToast.emit({ message: res.message, type: res.type }); // Emit the toast message here
          if(res.type =="success"){
          
            this.router.navigate(['users'])
          }
        });
    } else {
      this.valid = true;
      console.log("Form is invalid");
    }
  }
}
