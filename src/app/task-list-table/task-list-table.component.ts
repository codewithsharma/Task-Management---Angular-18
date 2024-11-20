import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './task-list-table.component.html',
  styleUrls: ['./task-list-table.component.css']
})
export class TaskListTableComponent implements OnInit {
  taskListDetail = [
  
  ]
  assignedBy =[]
  assignedTo =[]
  http = inject(HttpClient)
  itemsPerPage =8;
  currentPage = 1;
  totalPages = 1;
  paginatedTasks:any = [];

  async getAllTasks(){
    await this.http.get("http://localhost:4000/tasks/").subscribe((res:any)=>{
      console.log("res is ", res)
      this.taskListDetail= res.task;
      this.updatePaginatedTasks();
      this.calculateTotalPages();
    
    })
      }

  ngOnInit() {
    console.log("object")
    this.getAllTasks()
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.taskListDetail.length / this.itemsPerPage);
  }

  updatePaginatedTasks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.taskListDetail.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTasks();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTasks();
    }
  }
}
