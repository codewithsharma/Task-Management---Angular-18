import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {  
id:string =""
userInput:boolean =false
  constructor() { }
  isModalOpen:boolean = false

  openModal(id:string){
    this.isModalOpen = true
    this.id= id
  }
  closeModal(){
    this.isModalOpen = false
  }

}
