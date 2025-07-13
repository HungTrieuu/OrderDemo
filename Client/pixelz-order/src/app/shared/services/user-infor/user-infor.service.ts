import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUrl } from '../createUrl';

@Injectable({
  providedIn: 'root'
})
export class UserInforService {

  constructor(private http: HttpClient) {}

  getUserInfor() {
    return this.http.get<any>(createUrl(`UserInfo`));
  }
}
