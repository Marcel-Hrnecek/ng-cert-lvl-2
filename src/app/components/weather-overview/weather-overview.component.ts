import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { ZipCodeService } from '../../services/zip-code.service';
import { WeatherService } from '../../services/weather.api.service';

@Component({
  selector: 'app-weather-overview',
  templateUrl: './weather-overview.component.html',
  styleUrls: ['./weather-overview.component.less']
})
export class WeatherOverviewComponent implements OnInit, OnDestroy {

  readonly subscriptions: { [key: string]: Subscription } = {};

  isLoading: boolean;
  weatherList: WeatherData[] = [];

  constructor(
    private zipCodeService: ZipCodeService,
    private weatherService: WeatherService
  ) {
  }

  ngOnInit(): void {
    const zipCodes = this.zipCodeService.getZipCodes();
    if (zipCodes.length) {
      this.isLoading = true;
      this.subscriptions.weatherList = this.weatherService.getWeatherListByZipCodes(zipCodes)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe(weatherList => this.weatherList = weatherList);
    }
  }

  addLocation(value: string) {
    if (value && value.length > 0 && !this.zipCodeService.isZipCodeAlreadyStored(value)) {
      // TODO: Visualize loading state and error handling
      this.isLoading = true;
      this.subscriptions.loadWeather = this.weatherService.getWeatherByZipCode(value)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe((weatherData) => {
          this.zipCodeService.addZipCode(value)
          this.weatherList.push(weatherData);
        });
    }
  }

  removeLocation(zipCode: string) {
    this.weatherList = this.weatherList.filter(weatherData => weatherData.zipCode !== zipCode);
    this.zipCodeService.removeZipCode(zipCode);
  }

  weatherTrackByFn(index: number, weatherData: WeatherData): string {
    return weatherData.zipCode;
  }

  ngOnDestroy(): void {
    Object.keys(this.subscriptions).forEach(key => {
      if (this.subscriptions[key]) {
        this.subscriptions[key].unsubscribe();
        delete this.subscriptions[key];
      }
    });
  }
}
