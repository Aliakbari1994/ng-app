import {Injectable} from '@angular/core';

import {CheckPlatformService} from "../check-platform/check-platform.service";
import * as $ from 'jquery';
import 'select2';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddToPlaylistService {

  constructor(private checkPlatformService: CheckPlatformService) {
  }

  public init(): void {
    if (this.checkPlatformService.isBrowser) {
      // @ts-ignore
      $('.select2-playlist').select2({
        dropdownParent: $('#playlistModal'),
        theme: 'bootstrap4',
        width: '100%',
        dir: 'rtl',
        multiple: false,
        placeholder: 'پلی لیست مورد نظر را انتخاب کنید.',
        language: {
          noResults: () => {
            return 'نتیجه ای یافت نشد.';
          },
          searching: () => {
            return 'در حال جستجو ...';
          },
          errorLoading: () => {
            return 'خطا در بارگذاری';
          },
          inputTooLong: (args: any) => {
            return 'ورودی خیل طولانی می باشد.';
          },
          inputTooShort: (args: any) => {
            return 'ورودی خیلی کوتاه می باشد.';
          },
          loadingMore: () => {
            return 'بارگذاری بیشتر ...';
          },
          maximumSelected: (args: any) => {
            return 'حداکثر تعداد مجاز انتخاب شده است.';
          }
        },
        ajax: {
          url: `${environment.apiUrl}/playlist/ajax`,
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          delay: 250,
          type: 'GET',
          method: 'GET',
          crossDomain: true,
          cache: true,
          beforeSend: function (xhr: any) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization", window.localStorage.getItem('token') as string);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader("Content-Type", "application/json");
          },
          processResults(data: any): any {
            return {
              results: $.map(data, (item) => {
                return {
                  id: item.slug_id,
                  text: item.title,
                };
              })
            };
          },
        }
      });
    }
  }
}
