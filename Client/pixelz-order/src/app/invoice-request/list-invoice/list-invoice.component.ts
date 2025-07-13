import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridSharedComponent } from 'src/app/shared/component/grid-shared/grid-shared.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HeaderSharedComponent } from 'src/app/shared/component/header-shared/header-shared.component';
import { TypeAccount } from 'src/app/shared/const/type-account';
import { PopupWarningDeleteComponent } from 'src/app/order-management/popup-warning-delete/popup-warning-delete.component';
import { EditInvoiceComponent } from '../edit-invoice/edit-invoice.component';


@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit {

  input = 'Invoice';

  @ViewChild(GridSharedComponent)
  gridShared?: GridSharedComponent;

  fieldObject = [
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
      code: 'Amount',
      text: 'Total Amount',
      type: 'number'
    },
    {
      code: 'InvoiceDate',
      text: 'Invoice Date',
      type: 'date'
    }
  ];

  constructor(
    public router: Router,
    public dialog: MatDialog
  ) {
    console.log('⚡ InvoiceComponent LOADED');

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
      title: 'Invoice Detail',
      // Assuming row contains the class data to be edited
      OrderData: row
    };
    const dialog = this.dialog.open(EditInvoiceComponent, dialogConfig);
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
}
