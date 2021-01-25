import { Component, OnDestroy, OnInit } from '@angular/core';
import { Current } from '../interfaces/current';
import { Hour } from '../interfaces/hour';
import { WeatherService } from '../provider/weather.service';
import { take } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  current: Current;
  loaded = false;
  msg: {
    status: number;
    statusText: string;
    message: string;
  };
  interval$ = timer(0, 3600000);
  subscription: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.subscription = this.interval$.subscribe(() => {
        this.onGetCurrent();
      }
    )
  }

  onRefresh() {
    this.loaded = false;
    this.onGetCurrent();
  }

  onGetCurrent() {
    this.weatherService
      .getIp()
      .pipe(take(1))
      .subscribe(
        (data: any) => {
          this.weatherService
            .getCurrent(data.ip)
            .pipe(take(1))
            .subscribe(
              (data: any) => {
                const date = new Date;
                let hour = [];
                for (const key in data.forecast.forecastday[0].hour) {
                  const img = data.forecast.forecastday[0].hour[
                    key
                  ].condition.icon
                    .split('//cdn.weatherapi.com/weather/64x64/')
                    .pop();
                  const newHour: Hour = {
                    temp: data.forecast.forecastday[0].hour[key].temp_c,
                    precip: data.forecast.forecastday[0].hour[key].precip_in,
                    time: data.forecast.forecastday[0].hour[key].time,
                    will_it_rain: !!data.forecast.forecastday[0].hour[key]
                      .will_it_rain,
                    condition:
                      data.forecast.forecastday[0].hour[key].condition.text,
                    icon: 'assets/images/' + img.split('.').shift() + '.jpg',
                    feels_like:
                      data.forecast.forecastday[0].hour[key].feelslike_c,
                  };
                  const time = +newHour.time.split(' ').pop().split(':')[0];
                  const localTime = data.location.localtime
                    .split(' ')
                    .pop()
                    .split(':')[0];
                  if (localTime == time) {
                    this.current = {
                      icon: newHour.icon,
                      condition: newHour.condition,
                      feels_like: newHour.feels_like,
                      temp: newHour.temp,
                      is_day: !!data.forecast.forecastday[0].hour[key].is_day,
                      country: data.location.country,
                      name: data.location.name,
                      localTime: data.forecast.forecastday[0].date,
                      daily_chance_of_rain: +data.forecast.forecastday[0].day
                        .daily_chance_of_rain,
                      will_it_rain: !!data.forecast.forecastday[0].day
                        .totalprecip_in,
                      maxtemp: data.forecast.forecastday[0].day.maxtemp_c,
                      mintemp: data.forecast.forecastday[0].day.mintemp_c,
                      txt_rain: data.forecast.forecastday[0].day.condition.text,
                      hour: hour,
                    };
                  }
                  hour.push(newHour);
                }
                this.loaded = true;
              },
              (err: any) => {
                this.getError(err);
              }
            );
        },
        (err: any) => {
          this.getError(err);
        }
      );
  }

  getError(err: any) {
    this.loaded = false;
    this.msg = {
      status: err.status,
      statusText: err.statusText,
      message: err.error.error.message,
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
