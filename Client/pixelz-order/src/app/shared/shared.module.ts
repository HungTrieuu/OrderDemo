import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridSharedComponent } from './component/grid-shared/grid-shared.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormDynamicSharedComponent } from './component/form-dynamic-shared/form-dynamic-shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DirectiveSharedModule } from './directive/directive-shared.module';
import { InputSharedComponent } from './component/input-shared/input-shared.component';
import { SelectSharedComponent } from './component/select-shared/select-shared.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxSharedComponent } from './component/checkbox-shared/checkbox-shared.component';
import { TextAreaSharedComponent } from './component/text-area-shared/text-area-shared.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderSharedComponent } from './component/header-shared/header-shared.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    GridSharedComponent,
    FormDynamicSharedComponent,
    InputSharedComponent,
    SelectSharedComponent,
    CheckboxSharedComponent,
    TextAreaSharedComponent,
    HeaderSharedComponent,
    SidebarComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    DirectiveSharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    NgbModule,
    MatCheckboxModule
  ],
  exports: [
    GridSharedComponent,
    FormDynamicSharedComponent,
    HeaderSharedComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
