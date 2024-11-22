import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {
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
  modalType = "delete"


}
