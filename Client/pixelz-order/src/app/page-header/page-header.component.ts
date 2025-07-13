import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() heading: string;
  @Input() icon: string;
  _selectAllUnit = false;
  @Input()
  get selectAllUnit() {
    return this._selectAllUnit;
  }
  set selectAllUnit(val) {
    this._selectAllUnit = val;
  }

  _singleSelectUnit = false;
  @Input()
  get singleSelectUnit() {
    return this._singleSelectUnit;
  }
  set singleSelectUnit(val) {
    this._singleSelectUnit = val.toString() === 'true';
  }

  @Output() changeUnit: EventEmitter<any> = new EventEmitter<any>();

  _enableAddAction = false;

  listUnit = [];

  _unitSelected = '';
  get unitSelected() {
    return this._unitSelected;
  }
  set unitSelected(val) {
    this._unitSelected = val;
    const currentUnit = this.listUnit.find(x => x.Name === val);
    this.changeUnit.emit(currentUnit);
  }

  @Input()
  get enableAddAction() {
    return this._enableAddAction;
  }
  set enableAddAction(value) {
    this._enableAddAction = value.toString() === 'true';
  }

  @Input() parentLink: object;
  constructor(private router: Router) {}

  @Output()
  addAction: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {

  }


  switchLink(e, parentLink) {
    if (parentLink) {
      this.router.navigate([`/${parentLink['parentURL']}`]);
    }
  }

  clickAddAction(e) {
    this.addAction.emit();
  }

}
