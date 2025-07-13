import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../const/interface/field-config';

@Component({
  selector: 'app-checkbox-shared',
  templateUrl: './checkbox-shared.component.html',
  styleUrls: ['./checkbox-shared.component.scss']
})
export class CheckboxSharedComponent implements OnInit {
  field!: FieldConfig;
  group!: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
