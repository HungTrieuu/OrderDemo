import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../const/interface/field-config';

@Component({
  selector: 'app-date-shared',
  templateUrl: './date-shared.component.html',
  styleUrls: ['./date-shared.component.scss']
})
export class DateSharedComponent implements OnInit {
  field?: FieldConfig;
  group?: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
