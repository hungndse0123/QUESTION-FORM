import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuilderComponent } from './builder/builder.component';
import { AnswersComponent } from './answers/answers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';



@NgModule({
  declarations: [
    BuilderComponent,
    AnswersComponent,
    FormGeneratorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuilderComponent
      },
      {
        path: 'builder',
        component: BuilderComponent
      },
      {
        path: 'answers',
        component: AnswersComponent
      }
    ])
  ]
})
export class LandingModule { }
