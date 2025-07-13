import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PageHeaderComponent
  ],
  imports: [
    CommonModule, RouterModule, MatFormFieldModule, MatSelectModule, MatOptionModule
  ],
  exports: [PageHeaderComponent]
})
export class PageHeaderModule { }
