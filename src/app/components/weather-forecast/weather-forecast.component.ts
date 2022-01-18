import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subscription, switchMap, tap } from 'rxjs';
import { WeatherService } from '../../services/weather.api.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.less']
})
export class WeatherForecastComponent implements OnInit, OnDestroy {

  readonly subscriptions: { [key: string]: Subscription } = {};

  isLoading = true;

  zipCode: string;
  forecastData: ForecastData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.routeParams = this.route.params
      .pipe(
        map(params => params.zipCode),
        filter(zipCode => !!zipCode),
        tap(zipCode => this.zipCode = zipCode),
        switchMap(zipCode => this.weatherService.getForecastByZipCode(zipCode))
      )
      .subscribe((forecastData: ForecastData) => {
        this.forecastData = forecastData;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    Object.keys(this.subscriptions).forEach(key => {
      if (this.subscriptions[key]) {
        this.subscriptions[key].unsubscribe();
        delete this.subscriptions[key];
      }
    });
  }

  backToMain() {
    this.router.navigate(['']);
  }
}
