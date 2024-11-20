import { Component, inject, OnInit, viewChild } from '@angular/core';
import { TaskbarComponent } from "../../components/taskbar/taskbar.component";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TaskCardComponent } from "../../components/task-card/task-card.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AppComponent } from '../../app.component';
import { UsersTableComponent } from "../../users-table/users-table.component";
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { TaskListTableComponent } from "../../task-list-table/task-list-table.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskbarComponent, TaskFormComponent, TaskCardComponent, HttpClientModule, RouterModule, NavbarComponent, UsersTableComponent, TaskListComponent, TaskListTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
constructor(private appComponent:AppComponent){}
handleShowToast(event: { message: string, type: string }) {
  this.appComponent.showToast(event); // Call AppComponent's showToast with the emitted event data
}
  http = inject(HttpClient) 
  usersList:any =[]
  userData:any ={}
  ngOnInit(): void {
   this.getUserData()
   this.getAllUsersOnly()
  }
  async getAllUsersOnly(){
    await  this.http.get(`http://localhost:4000/users/get-all-users-only` ).subscribe((res:any)=>{
      this.usersList= res
       })
  }
 async getUserData(){
  await  this.http.get(`http://localhost:4000/users/`+"673aed1b378ac1f6aa395ceb" ).subscribe((res:any)=>{
   this.userData= res
    })
  }

}
