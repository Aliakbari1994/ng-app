import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeNumberFormatService {

  constructor() {
  }

  public intlFormat(num: any) {
    return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
  }

  public makeFriendly(num: any) {
    if (num >= 1000000)
      return this.intlFormat(num / 1000000) + 'M';
    if (num >= 1000)
      return this.intlFormat(num / 1000) + 'k';
    return this.intlFormat(num);
  }
}
