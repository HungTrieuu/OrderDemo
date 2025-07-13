import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderSharedComponent } from '../component/header-shared/header-shared.component';
import { TypeAccount } from '../const/type-account';

@Component({
  selector: 'sidebar-shared',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;

  moduleList = [];

  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(
    public router: Router,
    // private moduleFieldSV: ModuleFieldService
  ) {

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    this.getModuleField();
  }

  /**
   * Lấy danh sách các module
   */
  getModuleField() {
    // this.moduleFieldSV.getModuleField().subscribe(resp => {
    //   if (resp.Success) {
    //     this.moduleList = resp.Data;
    //   }
    // });
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    // this.authenticationSV.logout();
  }

  /**
   * Kiểm tra 1 module có hiển thị hay không
   */
  isDisplayModule(key) {
    if (this.moduleList.length > 0) {
      return this.moduleList.find(x => x.ModuleCode === key) ? true : false;
    } else {
      return false;
    }
  }

  setTitle() {
    return HeaderSharedComponent.UserInFor ? HeaderSharedComponent.UserInFor.AccountName : '';
  }

  linkToPRoductionService() {
    // warning this feature is under construction
    alert('This feature is under construction');
  }
}
