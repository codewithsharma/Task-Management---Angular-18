import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterModule } from '@angular/router';
import { UsersTableComponent } from '../../users-table/users-table.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskListTableComponent } from '../../task-list-table/task-list-table.component';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from "../../components/task-card/task-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, UsersTableComponent, TaskListComponent, TaskListTableComponent, TaskCardComponent],
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashBoardComponent implements OnInit {
constructor(private appComponent:AppComponent){}
handleShowToast(event: { message: string, type: string }) {
  this.appComponent.showToast(event); // Call AppComponent's showToast with the emitted event data
}
localData:any= localStorage.getItem("data")
LocalLoggedInUserData= JSON.parse(this.localData)
LoggedInUserData:any   ={  "task" :[]}
// LoggedInUserData?.task:any;
  http = inject(HttpClient) 
  userData:any ={}
  ngOnInit(): void {
    console.log("hello ",this.LoggedInUserData.task)
   this.getAllUsers()
   this.getAllTasks()
   this.getLoggedInuserDetail()
  }
  
  totalUser:number=0
  totalTasks : number = 0;
  async getAllTasks(){
    await this.http.get("http://localhost:4000/tasks").subscribe((res:any)=>{
      console.log("res is ", res)
     this.totalTasks = res.task.length
     console.log( "total " ,this.totalTasks)
    
    })
      }
 async getAllUsers(){
  await  this.http.get("http://localhost:4000/users/get-all-users" ).subscribe((res:any)=>{
   this.userData= res
   this.totalUser= res.length
    })
  }
  async getLoggedInuserDetail(){
    await this.http.get(`http://localhost:4000/users/details/${this.LocalLoggedInUserData.userId}`).subscribe((res:any)=>{
      console.log("Get LoggedInUserDetail", res)
      console.log("object", res)
  this.LoggedInUserData=res;
  console.log("User Data is ",this.LoggedInUserData.task);
  
    })
  }

}
