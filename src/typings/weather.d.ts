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

interface ForecastData {
  city: {
    name: string;
    timezone: number; // TODO: convert into sth. date pipe readable
  };
  list: ForecastWeather[];
}

interface ForecastWeather {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: { main: string }[];
}
