import {Component} from '@angular/core';

import {ExplorerHistoryService} from "../../../../core/services/explorer-history/explorer-history.service";

@Component({
  selector: 'app-home-go-back',
  templateUrl: './home-go-back.component.html',
  styleUrls: ['./home-go-back.component.scss']
})
export class HomeGoBackComponent {

  constructor(private explorerHistoryService: ExplorerHistoryService) {
  }

  goBack(): void {
    this.explorerHistoryService.goBack();
  }

}
