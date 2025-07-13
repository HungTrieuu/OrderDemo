import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/order', pathMatch: 'full' },
  { path: 'order', loadChildren: () => import('./order-management/order-management.module').then(m => m.OrderManagementModule) },
  { path: 'invoice', loadChildren: () => import('./invoice-request/invoice-request.module').then(m => m.InvoiceRequestModule) },

];

@NgModule({
  imports: [

    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
