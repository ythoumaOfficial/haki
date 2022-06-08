import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Poll_QuestionComponent } from './list/poll_question.component';
import { AddEditPoll_QuestionComponent } from './manage/poll_question-form.component';

const routes: Routes = [
  {
    path: '',
    component: Poll_QuestionComponent
  },
  {
    path: 'add',
    component: AddEditPoll_QuestionComponent
  },
  {
    path: ':id',
    component: AddEditPoll_QuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Poll_QuestionRoutingModule { }

