import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridSharedComponent } from 'src/app/shared/component/grid-shared/grid-shared.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupWarningDeleteComponent } from '../popup-warning-delete/popup-warning-delete.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { HeaderSharedComponent } from 'src/app/shared/component/header-shared/header-shared.component';
import { TypeAccount } from 'src/app/shared/const/type-account';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupConfirmCheckoutComponent } from '../popup-confirm-checkout/popup-confirm-checkout.component';


@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  input = 'Order';

  @ViewChild(GridSharedComponent)
  gridShared?: GridSharedComponent;

  fieldObject = [
    {
      code: 'MultiSelect',
      text: 'MultiSelect',
      type: 'checkbox',
      isHeader: true
    },
    {
      code: 'OrderNo',
      text: 'OrderNo'
    },
    {
      code: 'CreatedDate',
      text: 'CreatedDate',
      type: 'date'
    },
    {
      code: 'TotalAmount',
      text: 'Total Amount',
      type: 'number'
    },
    {
      code: 'Status',
      text: 'Status',
      type: 'text'
    },
    {
      code: 'Email',
      text: 'Email',
      type: 'text'
    },
    {
      code: 'Description',
      text: 'Description',
      type: 'textArea'
    }
  ];

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {
    console.log('⚡ OrderManagementComponent LOADED');

  }

  ngOnInit(): void {
  }

  checkDisableAddTeacher(data: any): boolean {
    return !(data.FromDate && data.Todate);
  }

  getSelectedRow() {
    return this.gridShared?.getSelectedRow() ? this.gridShared.getSelectedRow() : [];
  }

  showFormView(row: any): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      id: row.id,
      title: 'Order Detail',
      // Assuming row contains the class data to be edited
      OrderData: row,
      entityState: 'update',
      description: 'Edit Order',
      deleteUsingClass: true
    };
    const dialog = this.dialog.open(EditOrderComponent, dialogConfig);
    dialog.afterClosed().subscribe(resp => {
      if (resp) {
        this.gridShared?.reloadData();
      }
    });
  }


  createNewOrder() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      id: null,
      title: 'Add New Order',
      entityState: 'insert'
    };
    const dialog = this.dialog.open(EditOrderComponent, dialogConfig);
    dialog.afterClosed().subscribe(resp => {
      if (resp) {
        this.gridShared?.reloadData();
      }
    });
  }

  deleteOrder() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      OrderData: this.getSelectedRow()
    };
    const dialog = this.dialog.open(PopupWarningDeleteComponent, dialogConfig);
    dialog.afterClosed().subscribe(resp => {
      if (resp) {
        this.gridShared?.reloadData();
      }
    });
  }

  checkAnableAction() {
    return (
      HeaderSharedComponent.UserInFor &&
      (HeaderSharedComponent.UserInFor.TypeAccount === TypeAccount.Admin || HeaderSharedComponent.UserInFor.TypeAccount === TypeAccount.ArtDirector)
    );
  }

  checkoutOrder() {
    const selectedOrders = this.getSelectedRow();
    if (selectedOrders.length === 0) {
      return;
    }
    // Chỉ những đơn hàng có trạng thái 'New' mới được checkout
    const newOrders = selectedOrders.filter(order => order.Status === 'New');
    if (newOrders.length === 0) {
      this.snackBar.open('Only New Order can be checkout !!!', 'Đóng', {
        duration: 2000,
        panelClass: ['failed-notify']
      });
      return;
    }

    // open a dialog config checkout
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      OrderData: newOrders
    };
    const dialog = this.dialog.open(PopupConfirmCheckoutComponent, dialogConfig);
    dialog.afterClosed().subscribe(resp => {
      if (resp) {
        this.gridShared?.reloadData();
      }
    });
  }


}
