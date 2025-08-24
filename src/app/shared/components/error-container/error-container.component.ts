import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ErrorService } from '../../../core/services/error.service';

@Component({
  selector: 'app-error-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-container.component.html',
  styleUrl: './error-container.component.scss',
})
export class ErrorContainerComponent {

  private errorService = inject(ErrorService);

  message = signal<string | null>(null);

  constructor() {
    this.errorService.message$.subscribe(this.message.set);
  }

  close() {
    this.errorService.clear();
  }

}
