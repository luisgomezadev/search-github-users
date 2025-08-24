import { Component, Input } from '@angular/core';
import { User } from '../../../core/interfaces/user.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.scss'
})
export class CardUserComponent {
  @Input() user!: User;
}
