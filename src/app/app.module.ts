import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { WeatherOverviewComponent } from './components/weather-overview/weather-overview.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WeatherOverviewComponent
  },
  {
    path: 'forecast/:zipCode',
    component: WeatherForecastComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      relativeLinkResolution: 'legacy'
    }),
  ],
  declarations: [
    AppComponent,
    WeatherDetailsComponent,
    WeatherForecastComponent,
    WeatherOverviewComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
