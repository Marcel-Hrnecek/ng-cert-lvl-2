import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // TODO: Move into environment files
  private static readonly OW_API_KEY = '5a4b2d457ecbef9eb2a71e480b947604';
  private static readonly OW_API_BASE_URL = 'http://api.openweathermap.org/data/2.5';

  constructor(
    private http: HttpClient
  ) {
  }

  getWeatherListByZipCodes(zipCodes: string[]): Observable<WeatherData[]> {
    return forkJoin(zipCodes.map(zipCode => this.getWeatherByZipCode(zipCode)))
  }

  getWeatherByZipCode(zipCode: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(this.buildWeatherUrl(`zip=${zipCode}`))
      .pipe(
        tap(weatherData => weatherData.zipCode = zipCode)
      );
  }

  getForecastByZipCode(zipCode: string, dayCount = 5): Observable<ForecastData> {
    return this.http.get<ForecastData>(this.buildForecastUrl(`cnt=${dayCount}&zip=${zipCode}`));
  }

  private buildWeatherUrl(params: string): string {
    return `${WeatherService.OW_API_BASE_URL}/weather?appid=${WeatherService.OW_API_KEY}&units=imperial&${params}`;
  }

  private buildForecastUrl(params: string): string {
    return `${WeatherService.OW_API_BASE_URL}/forecast/daily?appid=${WeatherService.OW_API_KEY}&units=imperial&${params}`;
  }
}
