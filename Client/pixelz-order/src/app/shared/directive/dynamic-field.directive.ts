import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { FieldConfig } from '../const/interface/field-config';
import { FormGroup } from '@angular/forms';
import { InputSharedComponent } from '../component/input-shared/input-shared.component';
import { SelectSharedComponent } from '../component/select-shared/select-shared.component';
import { DateSharedComponent } from '../component/date-shared/date-shared.component';
import { CheckboxSharedComponent } from '../component/checkbox-shared/checkbox-shared.component';
import { TextAreaSharedComponent } from '../component/text-area-shared/text-area-shared.component';

const componentMapper: { [key: string]: any } = {
  input: InputSharedComponent,
  select: SelectSharedComponent,
  date: DateSharedComponent,
  checkbox: CheckboxSharedComponent,
  textArea: TextAreaSharedComponent
};
@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective {
  @Input() field: FieldConfig = {
    type: '',
    label: '',
    name: '',
    inputType: '',
    options: [],
    collections: null,
    value: null,
    rows: 1,
    validations: [],
    width: '100%'
  };
  @Input() group: FormGroup = new FormGroup({});
  componentRef: any;
  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}
  ngOnInit() {
    if (!this.field || !this.group) {
      return;
    }
    if (!componentMapper[this.field.type]) {
      console.error(`Component type ${this.field.type} is not recognized.`);
      return;
    }
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.field.type]);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

}
