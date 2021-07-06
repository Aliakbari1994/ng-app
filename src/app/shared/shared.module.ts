import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLoadingComponent } from './components/page-loading/page-loading.component';



@NgModule({
  declarations: [
    PageLoadingComponent
  ],
  exports: [
    PageLoadingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
