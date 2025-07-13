import { Component, OnInit } from '@angular/core';
import { HeaderSharedComponent } from '../shared/component/header-shared/header-shared.component';

@Component({
  selector: 'app-invoice-request',
  templateUrl: './invoice-request.component.html',
  styleUrls: ['./invoice-request.component.scss']
})
export class InvoiceRequestComponent implements OnInit {

  collapedSideBar: boolean;
  constructor() {

   }

  ngOnInit(): void {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  isLoadBody() {
    return HeaderSharedComponent.UserInFor ? true : false;
  }


}
