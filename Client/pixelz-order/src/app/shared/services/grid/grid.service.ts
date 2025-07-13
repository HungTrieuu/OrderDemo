import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUrl } from '../createUrl';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  constructor(private http: HttpClient) {}

  /**
   * Lấy dưx liệu paging
   */
  getDataPaging(dataPaging: any, tableName: string) {
    return this.http.post<any>(createUrl(`${tableName}/Paging`), dataPaging);
  }

  /**
   * Lấy tổng bản ghi
   * @param tableName
   */
  getTotalCount(tableName: string) {
    return this.http.get<any>(createUrl(`${tableName}/TotalCount`));
  }
}
