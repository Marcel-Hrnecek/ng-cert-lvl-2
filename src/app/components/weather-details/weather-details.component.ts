import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.less']
})
export class WeatherDetailsComponent implements OnInit {

  @Input() weatherData: WeatherData;
  @Output() closeDetails: EventEmitter<string> = new EventEmitter<string>();

  currentCondition: string;

  ngOnInit(): void {
    this.currentCondition = this.weatherData.weather[0]?.main;
  }

  close() {
    this.closeDetails.emit(this.weatherData.zipCode);
  }
}
