import { Component, OnInit, forwardRef, Output, EventEmitter, Input, Provider } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorCode } from '../../const/errorCode';
import { FieldConfig } from '../../const/interface/field-config';

const provider: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputSharedComponent),
  multi: true
};

@Component({
  selector: 'input-shared',
  templateUrl: './input-shared.component.html',
  styleUrls: ['./input-shared.component.scss'],
  providers: [provider]
})
export class InputSharedComponent implements OnInit, ControlValueAccessor {
  constructor(private fb: FormBuilder) {}

  @Input()
  get value() {
    return this._value;
  }
  set value(val) {
    this.writeValue(val);
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(value: boolean) {
    if (value === null || value === undefined || typeof value === 'boolean') {
      this._required = false;
    }

    this._required = value.toString() === 'true';
  }

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (value === null || value === undefined || typeof value === 'boolean') {
      this._disabled = false;
    }

    this._disabled = value.toString() === 'true';
  }

  _value!: string;

  @Input()
  placeholder!: string;

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

  ngModelTest = '';

  _required = false;

  _disabled = false;

  @Input()
  parentForm!: FormGroup;

  @Input()
  formControlText = '';

  @Input()
  boxLabel = '';

  onChange = (val: string) => {};

  ngOnInit() {}

  writeValue(value: string): void {
    this._value = value ? value : '';
    this.onChange(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onChange = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
}
