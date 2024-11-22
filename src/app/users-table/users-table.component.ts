import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationModalService } from '../service/confirmation-modal.service';
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { AppComponent } from '../app.component';
import { EditUserComponent } from "../edit-user/edit-user.component";
import { EditUserService } from '../service/edit-user.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ConfirmationModalComponent, EditUserComponent],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  constructor(private app: AppComponent) {}
  modal = inject(ConfirmationModalService);
  editModal = inject(EditUserService)
  http = inject(HttpClient);
  usersDetails = [];
  tempId: string = "";
  itemsPerPage = 8;
  currentPage = 1;
  totalPages = 1;
  paginatedUsers: any = [];

  // Handle boolean output from ConfirmationModalComponent
  handleModalAction(isConfirmed: boolean) {
    if (isConfirmed) {
      this.deleteUser(this.tempId);  // Call delete if confirmed
    }
    this.modal.closeModal();
  }
  


  openConfirmationModal(id: string) {
    this.tempId = id;
    this.modal.openModal(id);
  }
  openEditUserModal(id: string) {
    this.tempId = id;
    this.editModal.openModal(id);
    
  }

  async deleteUser(id: string) {
    await this.http.delete(`http://localhost:4000/users/${id}`).subscribe((res: any) => {
      this.app.showToast({ "message": res.message, "type": res.type });
      this.getAllUsers();  // Refresh user list after deletion
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }
  
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.usersDetails.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.usersDetails.slice(startIndex, endIndex);
  }

  async getAllUsers() {
    await this.http.get("http://localhost:4000/users/get-all-users").subscribe((res: any) => {
      this.usersDetails = res;
      this.updatePaginatedUsers();
      this.calculateTotalPages();
    });
  }
}
