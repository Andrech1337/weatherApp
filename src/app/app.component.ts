import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormControl, } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco'
import { MatMenuModule } from '@angular/material/menu';
import { IconScrPipe } from './icon-scr-pipe.pipe';
import { BackgroundSrcPipe } from './background-src.pipe';
import { NgStyle } from '@angular/common';


export interface DayInterface {
  avgTemperature: string[];
  date: string[];
  tempDay: string[];
  temperature: number[];
  temperature3hour: number[];
  temperatureFeel: number[];
  humidity: number[];
  pressure: number[];
  wind: number[];
  weatherCode: number[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatMenuModule, MatButtonModule,
    DatePipe,
    IconScrPipe, BackgroundSrcPipe,
    TranslocoModule,
    NgStyle,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  constructor(private http: HttpClient, private translocoService: TranslocoService) {

  }


  currentHourIndex = new FormControl<number>(0, {
    nonNullable: true,
  })
  currentDayIndex = new FormControl<number>(0, {
    nonNullable: true,
  })
  locale: string = "en-US"
  localeShort: string = this.locale.slice(0, 2)
  city: string = '';
  inputCity: string = "";
  currentWeater = {
    temperature: 0,
    temperatureFeel: 0,
    humidity: 0,
    pressure: 0,
    visibility: 0
  }

  time = new Date();
  offset: string = "+0000";
  intervalId: any;
  startTimer() {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  currentHour: number = 0;



  offsetPipe(seconds: number) {
    const absSeconds = Math.abs(seconds);
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const sign = seconds >= 0 ? '+' : '-';
    return `${sign}${formattedHours}${formattedMinutes}`;
  }


  country: string = 'country'
  weatherdata: any;
  citydata: any;
  timezone: number = 0;
  title: string = 'weather';

  ipInfo: any;

  getUserCity() {
    this.http.get('https://ipinfo.io/json?token=990e7d0d012bfe').subscribe((ipInfo: any) => {
      this.ipInfo = ipInfo;
      this.city = this.ipInfo.city;
      this.getCityInfo(this.city);
    })
  }

  getCityInfo(city: string) {
    this.inputCity = "";
    this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e4ec2b573e49d570c90539077f2ebaff`).subscribe((citydata: any) => {
      this.citydata = citydata;
      this.city = this.citydata[0].local_names[this.localeShort]
      this.country = citydata[0].country
      this.getWeaterData()
    });
  }

  getWeaterData() {
    this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${this.citydata[0].lat}&longitude=${this.citydata[0].lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m&timezone=auto`).subscribe((weatherdata: any) => {
      this.weatherdata = weatherdata;
      this.formatDays(weatherdata.hourly);
      this.offset = this.offsetPipe(weatherdata.utc_offset_seconds);
      this.currentHour = new Date(this.time.getTime() + this.weatherdata.utc_offset_seconds * 1000).getUTCHours();
      this.currentHourIndex.setValue(Math.floor(this.currentHour / 3));
    });

  }

  ngOnInit() {
    this.getUserCity();
    this.startTimer();
  }
  days?: DayInterface[] = [];
  formatDays(hours: any) {
    this.days = [];
    const daysCount: number = hours.apparent_temperature.length / 24;
    let day: DayInterface = {
      avgTemperature: [],
      date: [],
      tempDay: [],
      temperature: [],
      temperature3hour: [],
      temperatureFeel: [],
      humidity: [],
      pressure: [],
      wind: [],
      weatherCode: []
    };
    let hourCounter = 0;
    for (let i = 0; i < daysCount; i++) {
      day = {
        avgTemperature: [],
        date: [],
        tempDay: [],
        temperature: [],
        temperature3hour: [],
        temperatureFeel: [],
        humidity: [],
        pressure: [],
        wind: [],
        weatherCode: []
      };
      day.date.push(hours.time[hourCounter])
      day.tempDay.push(String(new Date(day.date[0]).getDate()))
      day.temperature.push(...hours.temperature_2m.slice(hourCounter, hourCounter + 24))
      day.temperature3hour = day.temperature.filter((_, index) => index % 3 === 0);
      day.avgTemperature.push(String(Math.round(day.temperature.reduce((sum, value) => sum + value, 0) / day.temperature.length)));
      day.temperatureFeel.push(...hours.apparent_temperature.slice(hourCounter, hourCounter + 24))
      day.humidity.push(...hours.relative_humidity_2m.slice(hourCounter, hourCounter + 24))
      day.pressure.push(...hours.surface_pressure.slice(hourCounter, hourCounter + 24))
      day.wind.push(...hours.wind_speed_10m.slice(hourCounter, hourCounter + 24))
      day.weatherCode.push(...hours.weather_code.slice(hourCounter, hourCounter + 24))
      hourCounter += 24;
      this.days?.push(day)
    }

  }
  logday(day: any) {
    console.log(Object.getOwnPropertyNames(day)
    )
  }
  ru() {
    this.locale = 'ru-RU'
    this.localeShort = this.locale.slice(0, 2)
    this.translocoService.setActiveLang(this.localeShort);
    this.city = this.citydata[0].local_names[this.localeShort]
  }
  en() {
    this.locale = 'en-US'
    this.localeShort = this.locale.slice(0, 2)
    this.translocoService.setActiveLang(this.localeShort);
    this.city = this.citydata[0].local_names[this.localeShort]
  }


  log() {
    console.log(this.citydata);
    console.log(this.weatherdata);
    console.log(this.currentHourIndex.value);
    console.log(this.currentDayIndex.value);
    console.log(this.days);
    console.log(this.days?.[this.currentDayIndex.value]?.weatherCode);
    console.log(this.days?.[this.currentDayIndex.value]?.weatherCode?.[this.currentHourIndex.value * 3]);
  };
}
