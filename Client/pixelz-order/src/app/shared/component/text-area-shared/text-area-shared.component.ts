import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../const/interface/field-config';

@Component({
  selector: 'app-text-area-shared',
  templateUrl: './text-area-shared.component.html',
  styleUrls: ['./text-area-shared.component.scss']
})
export class TextAreaSharedComponent implements OnInit {
  field: FieldConfig = {
    name: '',
    label: '',
    inputType: 'text',
    validations: [],
    value: '',
    type: 'input',
    width: '100%',
    options: [],
    collections: null,
    rows: 1
  };
  group!: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
