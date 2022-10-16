import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroesItemComponent } from './heroes/heroes-item/heroes-item.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltersComponent } from './filters/filters.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroDetailResolver } from './heroes/hero-detail/hero-detail.resolver';
import { HeroDetailService } from './heroes/hero-detail/hero-detail.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroesItemComponent,
    FiltersComponent,
    DashboardComponent,
    NavigationComponent,
    HeroDetailComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService, HeroDetailService, HeroDetailResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
