import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {takeWhile} from "rxjs/operators";
import {Observable} from "rxjs";

import {HomeFacade} from "../../store/home.facade";

@Component({
  selector: 'app-home-comments',
  templateUrl: './home-comments.component.html',
  styleUrls: ['./home-comments.component.scss']
})
export class HomeCommentsComponent implements OnInit, OnDestroy {
  @Input() commentableType: string = '';
  @Input() commentableId: string = '';
  componentActive = true;
  comments$ = this.homeFacade.comments$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  currentPage = 1;

  form = this.fb.group({
    body: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private fb: FormBuilder,
    private homeFacade: HomeFacade,
    private zone: NgZone,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.homeFacade.pagination$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.currentPage = res.currentPage
      });
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  get body(): AbstractControl {
    return this.form.get('body') as AbstractControl;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.homeFacade.dispatchStoreComment((this.body.value).trim(), this.commentableType, this.commentableId);
  }

  public loadMore() {
    this.homeFacade.dispatchShowComments(this.commentableType, this.commentableId, this.currentPage + 1)
  }

  public trackByFunc(index: number, el: any): number {
    return el.id;
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  }
}
