import { Component, OnInit } from '@angular/core';
import { HeaderSharedComponent } from '../shared/component/header-shared/header-shared.component';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
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
