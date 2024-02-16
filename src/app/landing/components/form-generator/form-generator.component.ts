import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.scss'
})
export class FormGeneratorComponent {
  @Input() formTemplate!: FormGroup;
  @Input() formConfig: any;

  onCheckChange(event: any, fconfig: any) {
    let fc = this.formTemplate.get(fconfig.formControlName);
    if (event.target.value == "Other") {
      fconfig.otherToggle = !fconfig.otherToggle;
      if (!fconfig.otherToggle) {
        if (fc?.value.includes(fconfig.savedOtherValue)) { 
          fc?.setValue(fc?.value.filter((item: any) => item !== fconfig.savedOtherValue));
        }  
      }
    } else {
      if (fc?.value.includes(event.target.value)) {
        fc?.setValue(fc?.value.filter((item: any) => item !== event.target.value));
      } else {
        fc?.setValue([...fc.value, event.target.value]);
      }
    }
  }

  updateOther(event: any, fconfig: any) {
    let fc = this.formTemplate.get(fconfig.formControlName);
    fconfig.otherValue = 'Other - ' + event.target.value;
    if (fconfig.otherToggle) {
      if (fc?.value.includes(fconfig.savedOtherValue)) {
        fc?.setValue(fc.value.map((item: any) => item == fconfig.savedOtherValue ? fconfig.otherValue : item));
      } else {
        fc?.setValue([...fc.value, fconfig.otherValue]);
      }
    }
    fconfig.savedOtherValue = fconfig.otherValue;
  }
}
