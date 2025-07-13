import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-popup-confirm-checkout',
  templateUrl: './popup-confirm-checkout.component.html',
  styleUrls: ['./popup-confirm-checkout.component.scss']
})
export class PopupConfirmCheckoutComponent implements OnInit {

  description = 'Warning: Formfirm Chekout Orders';

  data = [];

  deleteUsingClass = false;

  constructor(
    private dialogRef: MatDialogRef<PopupConfirmCheckoutComponent>,
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
      });
      this.handleCheckout(params);
  }

  handleCheckout(selectedOrders: any[]) {
    // Implement the logic to handle checkout
    // This could involve updating the order status, processing payment, etc.
    console.log('Handling checkout for orders:', selectedOrders);
    // For now, just log the selected orders
    console.log('Checkout Orders:', selectedOrders);

    this.orderSV.checkout(selectedOrders).subscribe(resp => {
      if (resp['Success']) {

        this.snackBar.open('Checkout successful !!!', 'Close', {
          duration: 2000,
          panelClass: ['success-notify']
        });
        this.dialogRef.close(resp.Data);
      } else {
        this.snackBar.open('Checkout failed', 'Close', {
          duration: 2000,
          panelClass: ['failed-notify']
        });
      }
    });
  }
}
