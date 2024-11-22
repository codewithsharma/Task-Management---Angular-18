import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ConfirmationModalService } from '../service/confirmation-modal.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Output() actionConfirmed = new EventEmitter<boolean>();

  constructor(private app: AppComponent) {}
  type = 'delete';
  http = inject(HttpClient);
  modal = inject(ConfirmationModalService);

    delete() {
    this.modal.userInput = true;
    this.actionConfirmed.emit(true); // Emit true when delete is confirmed
  }

  cancel() {
    this.actionConfirmed.emit(false); // Emit false when cancel is clicked
    this.modal.closeModal();
  }
}
