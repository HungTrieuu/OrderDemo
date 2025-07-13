import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldConfig } from '../../const/interface/field-config';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-dynamic-shared',
  templateUrl: './form-dynamic-shared.component.html',
  styleUrls: ['./form-dynamic-shared.component.scss'],
})
export class FormDynamicSharedComponent implements OnInit {

  @Input() fields: FieldConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});

  get value() {
    return this.form?.value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createControl();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form?.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form ? this.form : new FormGroup({})); // Ensure form is defined before validation
    }
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === 'button') {
        return;
      }
      const control = this.fb.control(field.value, this.bindValidations(field.validations || []));
      if (field.name) {
        group.addControl(field.name, control);
      }
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList: any[] = [];
      validations.forEach((valid: any) => {
        validList.push(valid.validater);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

}
