import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    WeatherDetailsComponent,
    WeatherForecastComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
