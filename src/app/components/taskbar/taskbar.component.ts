import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent implements OnInit {
  localData:any 
  userData:any
getLoggedInUser(){
  this.localData= localStorage.getItem("data")
this.userData= JSON.parse(this.localData)

}
ngOnInit(): void {
    this.getLoggedInUser()
}
}
