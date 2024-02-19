import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss'
})
export class BuilderComponent implements OnInit {
  @ViewChild('addForm') addForm!: TemplateRef<any>;
  @ViewChild('alert') alert!: TemplateRef<any>;
  addFormRef: any;
  alertRef: any;
  darkButtonClass: string = 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 border-2';
  formConfig1: any = {
    formElements: [
    ]
  }
  formConfig2: any = {
    formElements: [
      {
        title: 'Add Question',
        styleClass: 'text-1xl text-white underline',
        type: 'link',
        action: {
          execute: (data: any) => {
            this.addFormRef = this.modalService.show(this.addForm, { class: 'lmt-dialog' });
          }
        }
      },
      {
        title: 'Review my answers>',
        styleClass: this.darkButtonClass,
        type: 'button',
        action: {
          execute: (data: any) => {
            if (this.form.valid) {
              this.router.navigate(['form/answers'], { queryParams: { form: this.form, config: this.formConfig1 } });
            } else {
              this.alertRef = this.modalService.show(this.alert, { class: 'lmt-dialog' });
            }
          }
        }
      }
    ]
  }
  form: FormGroup = this.fb.group({});
  defaultQuestion: any = {
    formControlName: '',
    title: '',
    type: 'checkbox',
    styleClass: 'text-1xl text-white',
    styleTitleClass: 'text-2xl text-white font-bold',
    checkboxList: [],
    required: false,
    other: false
  };
  curNewQuestionForm: FormGroup = this.fb.group({
    formControlName: ['', Validators.required],
    title: [''],
    type: ['', Validators.required],
    checkboxList: [''],
    styleClass: [''],
    styleTitleClass: [''],
    required: [''],
    other: ['']
  });
  queryParam: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.queryParam = this.router.getCurrentNavigation()?.extras.queryParams;
    this.curNewQuestionForm.setValue(this.defaultQuestion);
  }
  ngOnInit(): void {
    if (this.queryParam.form) this.form = this.queryParam.form;
    if (this.queryParam.config) this.formConfig1 = this.queryParam.config;
  }

  onQuestionTypeChange(event: any) {
    this.curNewQuestionForm.get('type')?.setValue(event.target.value);
  }

  onAddNewAnswer() {
    let fc = this.curNewQuestionForm.get('checkboxList');
    fc?.setValue([...fc.value, '']);
  }

  updateCheckboxList(event: any, i: number) {
    let fc = this.curNewQuestionForm.get('checkboxList');
    let list = fc?.value;
    list[i] = event.target.value;
    fc?.setValue(list);
  }

  trackByFn(index: any) {
    return index;
  }

  onSubmit() {
    if (this.checkValid()) {
      this.curNewQuestionForm.get('title')?.setValue(this.curNewQuestionForm.get('formControlName')?.value);
      this.formConfig1.formElements.push(this.curNewQuestionForm.value);
      this.form.addControl(this.curNewQuestionForm.get('formControlName')?.value, new FormControl(''));
      if (this.curNewQuestionForm.get('required')?.value) {
        this.form.get(this.curNewQuestionForm.get('formControlName')?.value)?.setValidators([Validators.required]);
        this.form.get(this.curNewQuestionForm.get('formControlName')?.value)?.updateValueAndValidity();
      };
      this.curNewQuestionForm.setValue(this.defaultQuestion);
      this.addFormRef.hide();
    } else this.alertRef = this.modalService.show(this.alert, { class: 'lmt-dialog' });
  }

  onClose() {
    this.curNewQuestionForm.setValue(this.defaultQuestion);
    this.addFormRef.hide();
  }

  checkValid() {
    return this.curNewQuestionForm.valid && ((this.curNewQuestionForm.get('type')?.value == 'checkbox' 
    && !this.curNewQuestionForm.get('checkboxList')?.value.includes('')
    && this.curNewQuestionForm.get('checkboxList')?.value.length > 0) || (this.curNewQuestionForm.get('type')?.value == 'textarea')) ;
  }
}
