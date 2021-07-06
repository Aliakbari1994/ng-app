import {Component} from '@angular/core';

import {ExplorerHistoryService} from "../../../../core/services/explorer-history/explorer-history.service";

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.scss']
})
export class AuthNavbarComponent {

  constructor(private explorerHistoryService: ExplorerHistoryService) {
  }

  public goBack(): void {
    this.explorerHistoryService.goBack();
  }
}
