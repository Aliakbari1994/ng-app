import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';

import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";

// services
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {HomeFacade} from "../../store/home.facade";
// models
import {CurrentUser} from "../../../../shared/models/current-user/current-user.model";

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidebar') sidebar: ElementRef | undefined;
  @ViewChild('content') content: ElementRef | undefined;

  componentActive = true;
  message$: Observable<string | null> = this.homeFacade.message$.pipe(takeWhile(() => this.componentActive));
  error$: Observable<string | null> = this.homeFacade.error$.pipe(takeWhile(() => this.componentActive));
  loading$: Observable<boolean | null> = this.homeFacade.loading$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  currentUser$: Observable<CurrentUser> = this.homeFacade.currentUser$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private checkPlatformService: CheckPlatformService,
    private homeFacade: HomeFacade,
    private zone: NgZone,
  ) {
  }

  ngOnInit(): void {
    this.homeFacade.dispatchCheckAuth();
    this.zone.runOutsideAngular(() => {
      // subscribes
      this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive)).subscribe(
        res => {
          if (res) {
            this.homeFacade.dispatchCurrentUser();
          }
        }
      )
    });
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'background-color', '#181d30');
    this.sidebarMediaQueries();
    this.sidebarResizePage();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public sidebarMediaQueries(): void {
    if (this.checkPlatformService.isBrowser) {
      if (window.matchMedia('(max-width: 767.98px)').matches) {
        this.renderer.addClass(this.sidebar?.nativeElement, 'd-none');
        this.renderer.removeClass(this.content?.nativeElement, 'bal-full-content-body');
        this.renderer.removeClass(this.content?.nativeElement, 'bal-limited-content-body');
      }
      if (window.matchMedia('(min-width: 768px) and (max-width: 1199.98px)').matches) {
        this.renderer.removeClass(this.sidebar?.nativeElement, 'd-none');
        this.renderer.removeClass(this.sidebar?.nativeElement, 'opened-sidebar');
        this.renderer.addClass(this.sidebar?.nativeElement, 'closed-sidebar');
        this.renderer.removeClass(this.content?.nativeElement, 'bal-full-content-body');
        this.renderer.addClass(this.content?.nativeElement, 'bal-limited-content-body');
      }
      if (window.matchMedia('(min-width: 1200px)').matches) {
        this.renderer.removeClass(this.sidebar?.nativeElement, 'd-none');
        this.renderer.removeClass(this.sidebar?.nativeElement, 'closed-sidebar');
        this.renderer.addClass(this.sidebar?.nativeElement, 'opened-sidebar');
        this.renderer.removeClass(this.content?.nativeElement, 'bal-limited-content-body');
        this.renderer.addClass(this.content?.nativeElement, 'bal-full-content-body');
      }
    }
  }

  public sidebarResizePage(): void {
    if (this.checkPlatformService.isBrowser) {
      window.onresize = () => {
        this.sidebarMediaQueries();
      };
    }
  }

  public sidebarToggle(): void {
    if (this.checkPlatformService.isBrowser) {
      if (window.matchMedia('(max-width: 767.98px)').matches) {
        this.renderer.removeClass(this.sidebar?.nativeElement, 'closed-sidebar');
        this.renderer.addClass(this.sidebar?.nativeElement, 'opened-sidebar');
        if (this.sidebar?.nativeElement.classList.contains('d-none')) {
          this.renderer.removeClass(this.sidebar?.nativeElement, 'd-none');
        } else {
          this.renderer.addClass(this.sidebar?.nativeElement, 'd-none');
        }
      }
      if (window.matchMedia('(min-width: 768px) and (max-width: 1199.98px)').matches) {
        this.renderer.removeClass(this.content?.nativeElement, 'bal-full-content-body');
        this.renderer.addClass(this.content?.nativeElement, 'bal-limited-content-body');
        if (this.sidebar?.nativeElement.classList.contains('opened-sidebar')) {
          this.renderer.removeClass(this.sidebar?.nativeElement, 'opened-sidebar');
          this.renderer.addClass(this.sidebar?.nativeElement, 'closed-sidebar');
        } else {
          this.renderer.addClass(this.sidebar?.nativeElement, 'opened-sidebar');
          this.renderer.removeClass(this.sidebar?.nativeElement, 'closed-sidebar');
        }
      }
      if (window.matchMedia('(min-width: 1200px)').matches) {
        if (this.sidebar?.nativeElement.classList.contains('opened-sidebar')) {
          this.renderer.removeClass(this.sidebar?.nativeElement, 'opened-sidebar');
          this.renderer.addClass(this.sidebar?.nativeElement, 'closed-sidebar');
          this.renderer.addClass(this.content?.nativeElement, 'bal-limited-content-body');
          this.renderer.removeClass(this.content?.nativeElement, 'bal-full-content-body');
        } else {
          this.renderer.addClass(this.sidebar?.nativeElement, 'opened-sidebar');
          this.renderer.removeClass(this.sidebar?.nativeElement, 'closed-sidebar');
          this.renderer.removeClass(this.content?.nativeElement, 'bal-limited-content-body');
          this.renderer.addClass(this.content?.nativeElement, 'bal-full-content-body');
        }
      }
    }
  }

  public removeMessage(): void {
    this.homeFacade.dispatchRemoveMessage();
  }

  public removeError(): void {
    this.homeFacade.dispatchRemoveError();
  }
}
