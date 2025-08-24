import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GithubService } from '../../core/services/github.service';
import { CommonModule } from '@angular/common';
import { UserDetails } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  route = inject(ActivatedRoute);
  githubService = inject(GithubService);

  user = signal<UserDetails | null>(null);

  ngOnInit() {
    const login = this.route.snapshot.paramMap.get('login')!;
    this.githubService.getUser(login).subscribe(u => this.user.set(u));
  }
}
