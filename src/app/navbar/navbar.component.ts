import { Component, Input, input, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(private router:Router){}
Data :any
UserData :any
ngOnInit(): void {
  this.Data  = localStorage.getItem("data")
  this.UserData=JSON.parse(this.Data)
  console.log(this.UserData.name)
}

loggedOut(){

  localStorage.removeItem("data")
  this.router.navigate(["/login"])

}


}
