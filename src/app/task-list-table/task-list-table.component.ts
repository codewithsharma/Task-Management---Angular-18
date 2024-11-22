import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { ConfirmationModalService } from '../service/confirmation-modal.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-task-list-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ConfirmationModalComponent],
  templateUrl: './task-list-table.component.html',
  styleUrls: ['./task-list-table.component.css']
})
export class TaskListTableComponent implements OnInit {
  constructor(private app :AppComponent){}
  taskListDetail = [
  
  ]
  tempId: string = "";
  assignedBy =[]
  assignedTo =[]
  http = inject(HttpClient)
  itemsPerPage =8;
  currentPage = 1;
  totalPages = 1;
  paginatedTasks:any = [];
modal = inject(ConfirmationModalService)
  async getAllTasks(){
    await this.http.get("http://localhost:4000/tasks/").subscribe((res:any)=>{
      console.log("res is ", res)
      this.taskListDetail= res.task;
      this.updatePaginatedTasks();
      this.calculateTotalPages();
    
    })
      }
      
  openConfirmationModal(id: string) {
    this.tempId = id;
    this.modal.openModal(id);
  }
      
  async deleteTask(id: string) {
    await this.http.delete(`http://localhost:4000/tasks/${id}`).subscribe((res: any) => {
      this.app.showToast({ "message": res.message, "type": res.type });
      this.getAllTasks();  // Refresh user list after deletion
    });
  }

      handleModalAction(isConfirmed: boolean) {
        if (isConfirmed) {
          this.deleteTask(this.tempId);  // Call delete if confirmed
        }
        this.modal.closeModal();
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
