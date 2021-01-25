import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  apiKeyWeather = environment.apiKeyWeather;
  urlWeather = 'http://api.weatherapi.com/v1/forecast.json?key=';
  days = 1;

  constructor(
    private http: HttpClient
  ) { }

  getIp() {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  getCurrent(ip: string) {
    return this.http.get(this.urlWeather + this.apiKeyWeather + '&q=' + ip + '&days=' + this.days );
  }
}
