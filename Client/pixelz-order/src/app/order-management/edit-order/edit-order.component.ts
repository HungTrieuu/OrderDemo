import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ErrorCode } from 'src/app/shared/const/errorCode';
import { FieldConfig } from 'src/app/shared/const/interface/field-config';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  description = '';

  regConfig: FieldConfig[] = [
    {
      type: 'input',
      label: 'Order No',
      inputType: 'text',
      name: 'OrderNo',
      value: '',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: ErrorCode.emptyField
        }
      ]
    },
    {
      type: 'input',
      label: 'Total Amount',
      inputType: 'number',
      name: 'TotalAmount',
      value: '',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: ErrorCode.emptyField
        },
        {
          name: 'min',
          validator: Validators.min(0),
          message: ErrorCode.errorFormat
        }
      ]
    },
    {
      name: "Email",
      type: 'input',
      label: 'Email',
      inputType: 'input',
      value: '',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: ErrorCode.emptyField
        },
        {
          name: 'email',
          validator: Validators.email,
          message: ErrorCode.errorFormat
        }
      ]
    },
    {
      type: 'textArea',
      label: 'Description',
      name: 'Description',
      inputType: 'textArea',
      rows: 3,
      value: '',
      validations: []
    }

  ];

  entityState = 'insert';

  status = 'New';

  constructor(
    private dialogRef: MatDialogRef<EditOrderComponent>,
    private orderSV: OrderService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.description = data.title;
    this.entityState = data.entityState || 'insert';
    if (this.entityState === 'update') {
      this.regConfig.forEach(x => {
        if (data.OrderData[x.name] !== undefined) {
          x.value = data.OrderData[x.name];
        }
      });

    }
    this.status = data.OrderData?.Status || 'New';
  }

  ngOnInit(): void {
  }

  close() {
    event?.preventDefault();
    event?.stopPropagation();
    this.dialogRef.close();
  }

  save() {
    this.orderSV
      .insertOrUpdate({
        OrderNo: this.regConfig.find(x => x.name === 'OrderNo').value,
        Description: this.regConfig.find(x => x.name === 'Description').value,
        entityState: this.entityState,
        ModuleName: "Order",
        Status: 'New',
        TotalAmount: Number(this.regConfig.find(x => x.name === 'TotalAmount').value),
        Email: this.regConfig.find(x => x.name === 'Email').value,
        Action: this.entityState
      })
      .subscribe(resp => {
        if (resp.Success) {
          if (resp.Data && resp.Data.result === -1) {
            this.snackBar.open('OrderNo is dupplicated', 'Đóng', {
              duration: 2000,
              panelClass: ['failed-notify']
            });
          } else {
            this.snackBar.open('Update successed !!!', 'Đóng', {
              duration: 2000,
              panelClass: ['success-notify']
            });
            this.dialogRef.close(resp.Data);
          }
        } else {
          alert(resp.Message);
        }
      });
  }
}
