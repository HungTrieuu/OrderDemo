import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserInforService } from '../../services/user-infor/user-infor.service';
import { TypeAccount } from '../../const/type-account';

@Component({
  selector: 'header-shared',
  templateUrl: './header-shared.component.html',
  styleUrls: ['./header-shared.component.scss']
})
export class HeaderSharedComponent implements OnInit, OnDestroy {
  constructor(
    public router: Router,
    private userInforSV: UserInforService
  ) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }
  public static UserInFor = {
    TypeAccount: TypeAccount.ArtDirector,
    AccountName: 'ArtDirectorMember',
  };
  public pushRightClass: string;
  private subsArray: Array<any> = [];

  ngOnInit() {
    this.pushRightClass = 'push-right';
    const sub = this.userInforSV.getUserInfor().subscribe(resp => {
      if (resp.Success) {
        HeaderSharedComponent.UserInFor = resp.Data[0];
      }
    });
    this.subsArray.push(sub);
  }

  setTitle() {
    let role = '';
    if (HeaderSharedComponent.UserInFor.TypeAccount === TypeAccount.ArtDirector) {
      role = 'Art Director';
    } else if (HeaderSharedComponent.UserInFor.TypeAccount === TypeAccount.ArtMember) {
      role = 'Art Member';
    } else if (HeaderSharedComponent.UserInFor.TypeAccount === TypeAccount.Admin) {
      role = 'Admin';
    } else if (HeaderSharedComponent.UserInFor.TypeAccount === TypeAccount.Client) {
      role = 'Client';
    }
    return HeaderSharedComponent.UserInFor ? `${HeaderSharedComponent.UserInFor.AccountName} - ${role}` : '';
  }

  ngOnDestroy(): void {
    this.subsArray.forEach(ele => {
      ele.unsubscribe();
    });
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
    console.log('User logged out');
  }

}
