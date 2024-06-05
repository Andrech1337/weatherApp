import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconScr',
  standalone: true
})
export class IconScrPipe implements PipeTransform {

  transform(value?: number): string {
    switch (value) {
      default: return "/assets/img/icons/tropical-storm.svg";
      case 0: return "/assets/img/icons/clear-day.svg";
      case 1: return "/assets/img/icons/cloudy-day-1.svg";
      case 2: return "/assets/img/icons/cloudy-day-2.svg";
      case 3: return "/assets/img/icons/cloudy-day-3.svg";
      case 45:
      case 48: return "/assets/img/icons/fog.svg";
      case 51:
      case 53:
      case 55:
      case 61: return "/assets/img/icons/rainy-4.svg";
      case 56:
      case 57:
      case 66: return "/assets/img/icons/rain-and-sleet-mix.svg";
      case 63: return "/assets/img/icons/rainy-5.svg";
      case 65: return "/assets/img/icons/rainy-6.svg";
      case 67: return "/assets/img/icons/rain-and-snow-mix.svg";
      case 71: return "/assets/img/icons/snowy-1.svg";
      case 73: return "/assets/img/icons/snowy-2.svg";
      case 75: return "/assets/img/icons/snowy-3.svg";
      case 77: return "/assets/img/icons/hail.svg";
      case 80:
      case 81:
      case 82: return "/assets/img/icons/rainy-6.svg";
      case 85:
      case 86: return "/assets/img/icons/snowy-3.svg";
      case 95:
      case 96:
      case 99: return "/assets/img/icons/thunder.svg";
    }
  }
}
