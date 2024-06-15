import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconScr',
  standalone: true
})
export class IconScrPipe implements PipeTransform {

  transform(value?: number): string {
    const iconPaths: { [key: number]: string } = {
      0: "/assets/img/icons/clear-day.svg",
      1: "/assets/img/icons/cloudy-day-1.svg",
      2: "/assets/img/icons/cloudy-day-2.svg",
      3: "/assets/img/icons/cloudy-day-3.svg",
      45: "/assets/img/icons/fog.svg",
      48: "/assets/img/icons/fog.svg",
      51: "/assets/img/icons/rainy-4.svg",
      53: "/assets/img/icons/rainy-4.svg",
      55: "/assets/img/icons/rainy-4.svg",
      56: "/assets/img/icons/rain-and-sleet-mix.svg",
      57: "/assets/img/icons/rain-and-sleet-mix.svg",
      61: "/assets/img/icons/rainy-4.svg",
      63: "/assets/img/icons/rainy-5.svg",
      65: "/assets/img/icons/rainy-6.svg",
      66: "/assets/img/icons/rain-and-sleet-mix.svg",
      67: "/assets/img/icons/rain-and-snow-mix.svg",
      71: "/assets/img/icons/snowy-1.svg",
      73: "/assets/img/icons/snowy-2.svg",
      75: "/assets/img/icons/snowy-3.svg",
      77: "/assets/img/icons/hail.svg",
      80: "/assets/img/icons/rainy-6.svg",
      81: "/assets/img/icons/rainy-6.svg",
      82: "/assets/img/icons/rainy-6.svg",
      85: "/assets/img/icons/snowy-3.svg",
      86: "/assets/img/icons/snowy-3.svg",
      95: "/assets/img/icons/thunder.svg",
      96: "/assets/img/icons/thunder.svg",
      99: "/assets/img/icons/thunder.svg",
    };
    if (value === undefined) {
      return "/assets/img/icons/tropical-storm.svg";
    }
    return iconPaths[value] ?? "/assets/img/icons/tropical-storm.svg";
  }
}
