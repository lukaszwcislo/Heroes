import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroDetail } from '../heroes/hero.types';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  public pinnedHeroes$: Observable<HeroDetail[]> =
    this.dashboardService.pinnedHeroes$;

  public unpinAllHeroes() {
    this.dashboardService.unpinAllHeroes();
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}
}
