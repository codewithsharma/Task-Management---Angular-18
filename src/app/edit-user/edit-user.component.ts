import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditUserService } from '../service/edit-user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  tempId :string =""
  isEditModalOpen = false
  http = inject(HttpClient);
  modal = inject(EditUserService)
  router = inject(Router)
  @Output() showToast = new EventEmitter<{ message: string, type: string }>();
ngOnInit(): void {


}
  private formbuilderService = inject(FormBuilder);
  isPasswordMatched = false;
  valid = false;
  imagePreview: string | ArrayBuffer | null = null;
  editUserForm = this.formbuilderService.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
status:["",],
role:["user"],
image: [File]
  });
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.editUserForm.patchValue({ image: File });
      this.editUserForm.get('image')?.updateValueAndValidity();
this.editUserForm
      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  

getUserData(){
  this.http.get(`http://localhost:4000/users/:${this.tempId}`).subscribe((response) => {
    console.log(response);
  })
} 

  onSubmit(_id:string) {
    if (this.editUserForm.valid) {
      this.http.post(`http://localhost:4000/users/${_id}`, this.editUserForm.value)
        .subscribe((res: any) => {
          console.log(res);
          this.showToast.emit({ message: res.message, type: res.type }); // Emit the toast message here
          if(res.type =="success"){
            localStorage.setItem( "data", JSON.stringify(res) )
            console.log("navigation")
            this.router.navigate([''])
          }
        });
    } else {
      this.valid = true;
      console.log("Form is invalid");
    }
  }
}
