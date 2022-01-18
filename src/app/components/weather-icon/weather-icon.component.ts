import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html'
})
export class WeatherIconComponent implements OnChanges {

  private static readonly SUPPORTED_IMAGES = ['sun', 'snow', 'rain', 'clouds'];

  @Input() condition: string;
  @Input() klass: string;

  imageName: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.condition) {
      this.imageName = this.condition?.toLowerCase();
      // TODO: is clear=sun ? Find out and maybe map also other values to supported icons.
      // if (this.imageName === 'clear') {
      //   this.imageName = 'sun';
      // }
      if (!WeatherIconComponent.SUPPORTED_IMAGES.includes(this.imageName)) {
        // TODO: Default image for unsupported weather conditions
        this.imageName = null;
      }
    }
  }
}
