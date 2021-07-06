import {Component, Host} from '@angular/core';

import {ExplorerHistoryService} from "../../../../core/services/explorer-history/explorer-history.service";
import {HomeLayoutComponent} from "../home-layout/home-layout.component";

@Component({
  selector: 'app-home-top-bar',
  templateUrl: './home-top-bar.component.html',
  styleUrls: ['./home-top-bar.component.scss']
})
export class HomeTopBarComponent {

  constructor(
    @Host() private parent: HomeLayoutComponent,
    private explorerHistory: ExplorerHistoryService
  ) {
  }

  public sidebarToggle(): void {
    this.parent.sidebarToggle();
  }

  public goBack(): void {
    this.explorerHistory.goBack();
  }
}
