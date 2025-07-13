import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceRequestComponent } from './invoice-request.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceRequestComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListInvoiceComponent } // Ensure ListInvoiceComponent is imported correctly,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
