import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ErrorService } from '../../../core/services/error.service';

@Component({
  selector: 'app-error-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-container.component.html',
  styleUrl: './error-container.component.scss',
})
export class ErrorContainerComponent {

  message = signal<string | null>(null);

  constructor(private errors: ErrorService) {
    this.errors.message$.subscribe(this.message.set);
  }

  close() {
    this.errors.clear();
  }

}
