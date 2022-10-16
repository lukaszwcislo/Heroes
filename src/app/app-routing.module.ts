import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroesItemComponent } from './heroes/heroes-item/heroes-item.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailResolver } from './heroes/hero-detail/hero-detail.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    title: 'Heroes',
  },
  {
    path: 'heroes/detail/:id',
    component: HeroDetailComponent,
    title: 'Hero detail',
    resolve: { hero: HeroDetailResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
