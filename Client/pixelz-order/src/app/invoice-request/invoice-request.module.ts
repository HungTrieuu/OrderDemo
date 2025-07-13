import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-request-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { PageHeaderModule } from '../page-header/page-header.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { InvoiceRequestComponent } from './invoice-request.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';



@NgModule({
  declarations: [
    InvoiceRequestComponent,
    ListInvoiceComponent,
    EditInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    MatPaginatorModule ,
    MatTooltipModule,
    MatDialogModule,
    PageHeaderModule,
    MatSnackBarModule
  ]
})
export class InvoiceRequestModule { }
