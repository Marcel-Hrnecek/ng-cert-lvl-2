interface WeatherData {
  zipCode: string;
  name: string;
  weather: [{
    main: string;
  }];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  }
}
