import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createUrl } from '../createUrl';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  insertOrUpdate(orderData: any): Observable<any> {
    return this.http.post<any>(createUrl(`Order`), orderData);
  }


  delete(moduleName, keyField, keyValue): Observable<any> {
    return this.http.delete<any>(createUrl(`Order/delete/${moduleName}/${keyField}/${keyValue}`));
  }

  checkout(orderNos: string[]): Observable<any> {
    return this.http.post<any>(createUrl(`Order/checkout`), orderNos);
  }
}
