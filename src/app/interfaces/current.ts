import { Hour } from "./hour";

export interface Current {
  country: string,
  name: string,
  localTime: Date,
  daily_chance_of_rain: number,
  will_it_rain: boolean,
  maxtemp: number,
  mintemp: number,
  txt_rain: string,
  icon: string,
  condition: string,
  temp: number,
  feels_like: number,
  is_day: boolean,
  hour?: Hour[]
}
