import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../const/interface/field-config';

@Component({
  selector: 'app-select-shared',
  templateUrl: './select-shared.component.html',
  styleUrls: ['./select-shared.component.scss']
})
export class SelectSharedComponent implements OnInit {
  field?: FieldConfig;
  group: FormGroup = new FormGroup({});
  constructor() { }

  ngOnInit() {
  }

}
