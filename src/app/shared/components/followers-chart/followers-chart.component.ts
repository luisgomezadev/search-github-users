import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-followers-chart',
  standalone: true,
  imports: [],
  templateUrl: './followers-chart.component.html',
  styleUrl: './followers-chart.component.scss'
})
export class FollowersChartComponent implements OnChanges {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() type: ChartType = 'bar';

  private chart!: Chart;

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration = {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Seguidores',
            data: this.data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          } as ChartDataset
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }
}
