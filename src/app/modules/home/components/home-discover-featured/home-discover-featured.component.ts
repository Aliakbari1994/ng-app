import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {HomeFacade} from "../../store/home.facade";

@Component({
  selector: 'app-home-discover-featured',
  templateUrl: './home-discover-featured.component.html',
  styleUrls: ['./home-discover-featured.component.scss']
})
export class HomeDiscoverFeaturedComponent implements OnInit, OnDestroy {

  componentActive = true;
  featured$: Observable<any> = this.homeFacade.featured$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private homeFacade: HomeFacade,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug;
  }

}
