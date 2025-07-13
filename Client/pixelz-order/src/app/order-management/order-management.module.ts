import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PopupWarningDeleteComponent } from './popup-warning-delete/popup-warning-delete.component';
import { OrderManagementComponent } from './order-management.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PageHeaderModule } from '../page-header/page-header.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { PopupConfirmCheckoutComponent } from './popup-confirm-checkout/popup-confirm-checkout.component';


@NgModule({
  declarations: [
    EditOrderComponent,
    ListOrderComponent,
    PopupWarningDeleteComponent,
    OrderManagementComponent,
    PopupConfirmCheckoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrderManagementRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    PageHeaderModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  entryComponents: [PopupWarningDeleteComponent, EditOrderComponent, PopupConfirmCheckoutComponent]
})
export class OrderManagementModule { }
