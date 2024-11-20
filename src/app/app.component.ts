import { Component, Injectable, Output } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TaskbarComponent } from "./components/taskbar/taskbar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, TaskbarComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
}) 
@Injectable({
  providedIn:'root'
}) 
export class AppComponent {


  toastContent: any = {
    message: "Welcome Users",
    type: "Error",
  };

  showToast(res: { message: string, type: string }) {
    console.log("Toast Called");
    this.toastContent = {
      message: res.message,
      type: res.type
    };
    const elements = document.getElementById("SweetAlert");
    elements?.classList.add("block");

if(this.toastContent.type=="error"){
  elements?.classList.add("error");
}
if(this.toastContent.type=="success"){
  elements?.classList.add("success");
}


    setTimeout(() => {
      elements?.classList.remove("block");
      elements?.classList.remove("success");
      elements?.classList.remove("error");
    }, 3000);
  }
}
