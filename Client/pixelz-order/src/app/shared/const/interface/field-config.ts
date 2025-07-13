import { Validator } from './validator';

export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  rows?: number;
  validations?: Validator[];
  width?: string;
}
