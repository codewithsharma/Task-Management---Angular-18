import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  usersDetails=[ {Id:"2"} ]
  http = inject(HttpClient)

 async getAllUsers(){
await this.http.get("http://localhost:4000/users/get-all-users").subscribe((res:any)=>{
  console.log("res is ", res)
  this.usersDetails= res;
  this.updatePaginatedUsers();
  this.calculateTotalPages();

})
  }

  itemsPerPage =8;         
  currentPage = 1;          
  totalPages = 1;           
  paginatedUsers :any = [];      

  ngOnInit() {
    this.getAllUsers()
    console.log(this.usersDetails)
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.usersDetails.length / this.itemsPerPage);
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.usersDetails.slice(startIndex, endIndex);
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
}
