import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-popup-warning-delete',
  templateUrl: './popup-warning-delete.component.html',
  styleUrls: ['./popup-warning-delete.component.scss']
})
export class PopupWarningDeleteComponent implements OnInit {
  description = 'Warning: Delete Orders';

  data = [];

  deleteUsingClass = false;

  constructor(
    private dialogRef: MatDialogRef<PopupWarningDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
    private orderSV: OrderService
  ) {
    this.data = data.OrderData;
  }

  ngOnInit() {
  }

  close() {
    event.preventDefault();
    event.stopPropagation();
    this.dialogRef.close();
  }

  save() {
    const params = this.data
      .map(x => {
        return x.OrderNo;
      })
      .toString();
    this.orderSV.delete("Order", "OrderNo", params).subscribe(resp => {
      if (resp['Success']) {
        this.snackBar.open('Xóa thành công', 'Đóng', {
          duration: 2000,
          panelClass: ['success-notify']
        });
        this.dialogRef.close(true);
      } else {
        this.snackBar.open('Đã có lỗi xảy ra', 'Đóng', {
          duration: 2000,
          panelClass: ['failed-notify']
        });
      }
    });
  }
}


