import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss'
})
export class AnswersComponent implements OnInit{
  formConfig: any = {
    formElements: [
      {
        title: 'Back to Forms Builder',
        type: 'link',
        styleClass: 'text-1xl text-white underline',
        action: {
          execute:(data: any) => {
            this.router.navigate([`form/builder`], { queryParams: { form: this.form, config: this.config } });
          }
        }
      }
    ]
  }
  form: FormGroup = this.fb.group({});
  config: any;
  queryParam: any;
  elementArr: any[] = [];
  constructor (
    private fb: FormBuilder,
    private router: Router
  ) {
    this.queryParam = this.router.getCurrentNavigation()?.extras.queryParams;
  }

  ngOnInit(): void {
    this.form = this.queryParam.form;
    this.config = this.queryParam.config;
    for (const [key, value] of Object.entries(this.form.value)) {
      this.elementArr.push({
        formControlName: key,
        title: key,
        body: value,
        type: 'disable-text',
        styleClass: 'text-1xl text-white',
        styleTitleClass: 'text-2xl text-white font-bold',
      })
    }
    this.formConfig.formElements = [...this.elementArr, ...this.formConfig.formElements];
  }
}
