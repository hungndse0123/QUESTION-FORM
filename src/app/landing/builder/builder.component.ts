import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss'
})
export class BuilderComponent implements OnInit{
  @ViewChild('addForm') addForm!: TemplateRef<any>;
  @ViewChild('alert') alert!: TemplateRef<any>;
  addFormRef: any;
  alertRef: any;
  formConfig1: any = {
    formElements: [
    ]
  }
  formConfig2: any = {
    formElements: [
      {
        title: 'Add Question',
        type: 'link',
        action: {
          execute: (data: any) => {
            this.addFormRef = this.modalService.show(this.addForm, { class: 'lmt-dialog' });
          }
        }
      },
      {
        title: 'Review my answers>',
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
    checkboxList: [],
    required: false,
    other: false
  };
  curNewQuestion: any = {
    formControlName: '',
    title: '',
    type: 'checkbox',
    checkboxList: [],
    required: false,
    other: false
  };
  queryParam: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService
  ) { 
    this.queryParam = this.router.getCurrentNavigation()?.extras.queryParams;
  }
  ngOnInit(): void {
    if (this.queryParam.form) this.form = this.queryParam.form;
    if (this.queryParam.config) this.formConfig1 = this.queryParam.config;
  }

  onQuestionTypeChange(event: any) {
    this.curNewQuestion.type = event.target.value;
  }

  onAddNewAnswer() {
    this.curNewQuestion.checkboxList.push('');
  }

  updateCheckboxList(event: any, i: number) {
    this.curNewQuestion.checkboxList[i] = event.target.value;
  }

  updateQuestion(event: any) {
    this.curNewQuestion.formControlName = event.target.value;
    this.curNewQuestion.title = event.target.value;
  }

  onCheckChange(event: any, type: string) {
    switch (type) {
      case 'require':
        this.curNewQuestion.required = !this.curNewQuestion.required;
        break;
      case 'other':
        this.curNewQuestion.other = !this.curNewQuestion.other;
        break;
      default:
    }
  }

  onSubmit() {
    if (this.checkValid()) {
      this.formConfig1.formElements.push(this.curNewQuestion);
      this.form.addControl(this.curNewQuestion.formControlName, new FormControl(''));
      if (this.curNewQuestion.required) {
        this.form.get(this.curNewQuestion.formControlName)?.setValidators([Validators.required]);
        this.form.get(this.curNewQuestion.formControlName)?.updateValueAndValidity();
      };
      this.curNewQuestion = this.defaultQuestion;
      this.addFormRef.hide();
    } else this.alertRef = this.modalService.show(this.alert, { class: 'lmt-dialog' });
  }

  checkValid() {
    return (this.curNewQuestion.formControlName !== ''
      && this.curNewQuestion.title !== ''
      && this.curNewQuestion.type == 'checkbox'
      && !this.curNewQuestion.checkboxList.includes('')
      && this.curNewQuestion.checkboxList.length > 0) || (
        this.curNewQuestion.formControlName !== ''
      && this.curNewQuestion.title !== ''
      && this.curNewQuestion.type == 'textarea'
      )
  }
}
