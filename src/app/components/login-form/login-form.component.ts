import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @Output() showToast = new EventEmitter<{ message: string, type: string }>();
  private formbuilderService = inject(FormBuilder)
  http = inject(HttpClient)
  router = inject(Router)
  userId = ""
  constructor(private cookieService: CookieService) { }
  isPasswordMatched = false
  valid = false;;
  loginForm = this.formbuilderService.group(
    {
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],

    }

  )

   async onSubmit() {
    console.log("Login Called")
  await  this.http.post("http://localhost:4000/users/login", this.loginForm.value).subscribe((response: any) => {
      console.log("Login APi Res", response)
      this.showToast.emit({ "message": response.message, "type": response.type })
      this.cookieService.set("token", response.token)
      localStorage.setItem( "data", JSON.stringify(response) )
      if (response.type == "success") {
        console.log("navigation")
        this.userId = response.id
        this.router.navigate(['dashboard'])
      }

    })
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);


    }
    else {
      this.valid = true;
      console.log(this.loginForm)
      console.log("error ")
    }
  }

}
