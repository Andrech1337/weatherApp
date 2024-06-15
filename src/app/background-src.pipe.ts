import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backgroundSrc',
  standalone: true
})
export class BackgroundSrcPipe implements PipeTransform {

  transform(value?: number): string {
    const iconPaths: { [key: number]: string } = {
      0: "/assets/img/backgrounds/clear-day.jpg",
      1: "/assets/img/backgrounds/cloudy-day.jpg",
      2: "/assets/img/backgrounds/cloudy-day.jpg",
      3: "/assets/img/backgrounds/cloudy-day.jpg",
      45: "/assets/img/backgrounds/foggy-day.jpg",
      48: "/assets/img/backgrounds/foggy-day.jpg",
      51: "/assets/img/backgrounds/rainy-day.jpg",
      53: "/assets/img/backgrounds/rainy-day.jpg",
      55: "/assets/img/backgrounds/rainy-day.jpg",
      56: "/assets/img/backgrounds/rainy-day.jpg",
      57: "/assets/img/backgrounds/rainy-day.jpg",
      61: "/assets/img/backgrounds/rainy-day.jpg",
      63: "/assets/img/backgrounds/rainy-day.jpg",
      65: "/assets/img/backgrounds/rainy-day.jpg",
      66: "/assets/img/backgrounds/rainy-day.jpg",
      67: "/assets/img/backgrounds/rainy-day.jpg",
      71: "/assets/img/backgrounds/snowy-day.jpg",
      73: "/assets/img/backgrounds/snowy-day.jpg",
      75: "/assets/img/backgrounds/snowy-day.jpg",
      77: "/assets/img/backgrounds/snowy-day.jpg",
      80: "/assets/img/backgrounds/rainy-day.jpg",
      81: "/assets/img/backgrounds/rainy-day.jpg",
      82: "/assets/img/backgrounds/rainy-day.jpg",
      85: "/assets/img/backgrounds/snowy-day.jpg",
      86: "/assets/img/backgrounds/snowy-day.jpg",
      95: "/assets/img/backgrounds/thunder-day.jpg",
      96: "/assets/img/backgrounds/thunder-day.jpg",
      99: "/assets/img/backgrounds/thunder-day.jpg",
    };
    if (value === undefined) {
      return "/assets/img/background/thunder-day.jpg";
    }
    return iconPaths[value] ?? "/assets/img/background/thunder-day.jpg";
  }

}
