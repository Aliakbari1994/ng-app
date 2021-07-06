import {Component, Input} from '@angular/core';

import {HomeFacade} from "../../store/home.facade";
import {ClipboardService} from "../../../../core/services/clipboard/clipboard.service";

@Component({
  selector: 'app-home-share',
  templateUrl: './home-share.component.html',
  styleUrls: ['./home-share.component.scss']
})
export class HomeShareComponent {
  @Input() url: string = '';

  constructor(
    private homeFacade: HomeFacade,
    private clipboardService: ClipboardService,
  ) { }

  public onCopyToClipboard(): void {
    this.clipboardService.copy('copyToClipboard');
    this.homeFacade.dispatchSendMessage('آدرس صفحه کپی شد.');
  }

}
