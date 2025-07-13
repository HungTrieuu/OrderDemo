import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { createUrl } from '../../services/createUrl';
import * as moment from 'moment';
import { GridService } from '../../services/grid/grid.service';


declare var $: any;
@Component({
  selector: 'grid-shared',
  templateUrl: './grid-shared.component.html',
  styleUrls: ['./grid-shared.component.scss']
})
export class GridSharedComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color', 'detail'];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  @Output()
  eventDetailAction: EventEmitter<any> = new EventEmitter();

  @Output()
  executeAction: EventEmitter<any> = new EventEmitter();

  @Input()
  fieldObject: Array<any> = [];

  @Input()
  tableName!: string;

  @Input()
  customUrl: string | undefined;

  fieldNameHeader: Array<string> = [];

  @Input()
  customParams = {};

  @Input()
  unitID!: number;

  @Input()
  customColumnName?: string;

  @Input()
  customColumns?: TemplateRef<any>;

  @Input()
  customAction: TemplateRef<any>;

  selectAll = false;

  filterObjects = [];

  constructor(private eRef: ElementRef, private gridSV: GridService, private http: HttpClient) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.fieldNameHeader = this.fieldObject.map(field => {
      return field.text;
    });
    this.fieldNameHeader.push('detail');

    setTimeout(() => {
      this.getDataPaging();
      // this.getTotalCount();
    }, 300);
  }

  /**
   * Lấy dữ liệu paging
   */
  getDataPaging() {
    const params = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize ? this.paginator.pageSize : 5,
      sort: this.getDataSort(),
      ModuleName: this.tableName,
      FilterObjects: this.filterObjects
    };
    if (this.customUrl) {
      return this.http.post<any>(createUrl(this.customUrl), params).subscribe(resp => {
        this.paginator.length = 0;
        if (resp.Success && resp.Data) {
          this.dataSource = new MatTableDataSource(resp.Data.Items);
          if (this.dataSource) {
            if (this.sort) {
              this.dataSource.sort = this.sort;
            }
          }
          this.paginator.length = resp.Data.Total;
        }
      });
    }

    return this.gridSV.getDataPaging(params, this.tableName).subscribe(resp => {
      this.paginator.length = 0;
      if (resp.Success && resp.Data) {
        this.dataSource = new MatTableDataSource(resp.Data.Items);
        if (this.dataSource && this.sort) {
          this.dataSource.sort = this.sort;
        }
        this.paginator.length = resp.Data.Total;
      }
    });
  }

  getDataSort() {
    const field = this.fieldObject.find(x => x.text === this.sort?.active);
    if (this.sort?.direction === '' || !field) {
      return '';
    }
    return `${field.code} ${this.sort?.direction}`;
  }

  /**
   * Lấy số lượng tổng bản ghi
   */
  getTotalCount() {
    if (this.customUrl) {
      return this.http.post<any>(createUrl(`${this.customUrl}/totalCount`), this.customParams).subscribe(resp => {
        if (resp.Success && resp.Data) {
          if (this.paginator) {
            this.paginator.length = resp.Data.total;
          }
        }
      });
    }

    return this.gridSV.getTotalCount(this.tableName).subscribe(resp => {
      if (resp.Success && resp.Data) {
        if (this.paginator) {
          this.paginator.length = resp.Data.total;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    const me = this;
    setTimeout(() => {
      me.setFillHeightTable();
    }, 300);
    window.onresize = (event: any) => {
      me.setFillHeightTable();
    };
  }

  /**
   * Set kích thước table
   */
  setFillHeightTable() {
    const height =
      window.innerHeight -
      $(this.eRef.nativeElement)
        .find('.mat-table')
        .offset().top -
      $(this.eRef.nativeElement)
        .find('thead')
        .height() -
      $(this.eRef.nativeElement)
        .find('.mat-paginator-container')
        .height() -
      16;

    $(this.eRef.nativeElement)
      .find('tbody')
      .height(height + 'px');
  }

  applyFilter(filterValue: string) {
    this.filterObjects = [];
    if (filterValue) {
      this.filterObjects.push({
        FieldName: 'OrderNo',
        Value: filterValue,
        Operator: 'Contains'
      });
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.getDataPaging();
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.selectAll = false;
    // Reset the paginator to the first page after filtering
    this.dataSource.paginator = this.paginator;
    // Ensure the paginator starts at the first page after filtering
    if (this.paginator && this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getRecord(row: any) { }

  eventDetail(e: Event, row: any) {
    this.eventDetailAction.emit(row);
  }

  /**
   * sự kiện thay đổi paging grid
   * @param e
   */
  getServerData() {
    this.getDataPaging();
  }

  getFieldData(name: string) {
    const field = this.fieldObject.find(x => x.text === name);
    return field;
  }

  setDataField(row: any, column: string) {
    const field = this.getFieldData(column);
    const code = field.code ? field.code : '';
    const type = field.type ? field.type : '';
    if (code === 'Gender') {
      return row[code] === 0 ? 'Nam' : 'Nữ';
    }
    if (code === 'ToDate' || code === 'FromDate') {
      return moment(row[code]).format('DD-MM-YYYY');
    }
    if (type === 'date') {
      return moment(row[code]).format('DD-MM-YYYY');
    }
    return row[code];
  }

  reloadData() {
    this.selectAll = false;
    this.getDataPaging();
    // this.getTotalCount();
  }

  sortChange(e: any) {
    this.getDataPaging();
  }

  clickSelectAll(e: Event) {
    this.dataSource.filteredData.map(x => {
      x['IsSelected'] = e;
      return x;
    });
    this.executeAction.emit({
      action: this.getSelectedRow()?.length < 0 ? "selectAll" : "unselectAll",
      data: this.getSelectedRow()
    });
  }

  clickSelectRow(e: any) {
    this.selectAll = this.getSelectedRow().length === this.dataSource.filteredData.length;
    this.executeAction.emit({
      action: this.getSelectedRow()?.length < 0 ? "selectAll" : "unselectAll",
      data: this.getSelectedRow()
    });
  }

  getSelectedRow() {
    return this.dataSource.filteredData.filter(x => x['IsSelected']);
  }
}
