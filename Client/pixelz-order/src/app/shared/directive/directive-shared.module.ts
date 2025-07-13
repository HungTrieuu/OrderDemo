import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    DynamicFieldDirective
  ],
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  exports: [
    DynamicFieldDirective
  ]
})
export class DirectiveSharedModule { }
