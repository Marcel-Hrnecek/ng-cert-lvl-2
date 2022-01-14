import { Component } from '@angular/core';
import { ZipCodeService } from './services/zip-code.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private zipCodeService: ZipCodeService
  ) {
  }

  addLocation(value: string) {
    if (value && value.length > 0) {
      this.zipCodeService.addZipCode(value);
    }
  }
}
