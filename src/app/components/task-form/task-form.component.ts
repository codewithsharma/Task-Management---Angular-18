import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    HttpClientModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  @Output() showToast = new EventEmitter<{ message: string; type: string }>();
  http = inject(HttpClient);
  router =inject(Router)
  dropdownList: any = [];
  localStorageData:any = localStorage.getItem("data")
  LoggedUserData= JSON.parse(this.localStorageData)
  async getAllUsers() {
    await this.http
      .get('http://localhost:4000/users/get-all-users-only')
      .subscribe((res) => {
        this.dropdownList = res;
        console.log(this.dropdownList);
      });
  }

  selectedItems: any = [];

  dropdownSettings: any = {};
  ngOnInit() {
    this.getLocalStorageData();
    this.getAllUsers();

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  data: any;
  UserData: any;
  getLocalStorageData() {
    this.data = localStorage.getItem('data');
    this.UserData = JSON.parse(this.data);
    console.log('User Data ', this.UserData);
  }


  valid = false;
  async onSubmit() {
    console.log('submit Task Called', this.taskForm);
    if (this.taskForm.valid) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      await this.http
        .post('http://localhost:4000/tasks/create/', this.taskForm.value, {
          headers,
        })
        .subscribe((res: any) => {
          console.log('response is', res);
          this.showToast.emit({ message: res.message, type: res.type });
          this.router.navigateByUrl("/tasks")
        });
      console.log(this.taskForm.value);
    } else {
      console.log(this.taskForm.value);
      this.valid = true;
    }
  }
  taskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(8)]],
    assignedBy: [this.LoggedUserData.userId],
    assignedTo: [[], Validators.required],
    dueDate: ['', Validators.required],
    dueTime: ['', Validators.required],
  });
}
   
// user name
