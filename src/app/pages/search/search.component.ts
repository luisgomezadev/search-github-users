import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { searchValidator } from '../../shared/utils/validators';
import { CommonModule } from '@angular/common';
import { ErrorContainerComponent } from '../../shared/components/error-container/error-container.component';
import { User, UserDetails } from '../../core/interfaces/user.interface';
import { GithubService } from '../../core/services/github.service';
import { Response } from '../../core/interfaces/response.interface';
import { CardUserComponent } from '../../shared/components/card-user/card-user.component';
import { FollowersChartComponent } from '../../shared/components/followers-chart/followers-chart.component';
import { forkJoin, switchMap, tap } from 'rxjs';
import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorContainerComponent,
    CardUserComponent,
    FollowersChartComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private fb = inject(FormBuilder);
  private githubService = inject(GithubService);
  private errorService = inject(ErrorService);

  form: FormGroup;

  loading = signal(false);
  users = signal<User[]>([]);

  chartLabels = signal<string[]>([]);
  chartFollowers = signal<number[]>([]);

  constructor() {
    this.form = this.fb.group({
      query: ['', [searchValidator(), Validators.required]],
    });
  }

  onSearch(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorService.clear();

    this.githubService.searchUsers(this.form.value.query).pipe(
      switchMap((res: Response) => {
        const users = (res.items ?? []).map(u => ({
          login: u.login,
          id: u.id,
          avatar_url: u.avatar_url
        }));
        this.users.set(users);

        const userDetails$ = users.map(u => this.githubService.getUser(u.login));
        return forkJoin(userDetails$);
      }),
      tap((details: UserDetails[]) => {
        const labels = details.map(d => d.login);
        const followers = details.map(d => d.followers ?? 0);
        this.chartLabels.set(labels);
        this.chartFollowers.set(followers);
        this.loading.set(false);
      })
    ).subscribe({
      error: () => this.loading.set(false)
    });
  }
}
