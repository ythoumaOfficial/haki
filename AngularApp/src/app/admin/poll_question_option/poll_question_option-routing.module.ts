import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Poll_Question_OptionComponent } from './list/poll_question_option.component';
import { AddEditPoll_Question_OptionComponent } from './manage/poll_question_option-form.component';

const routes: Routes = [
  {
    path: '',
    component: Poll_Question_OptionComponent
  },
  {
    path: 'add',
    component: AddEditPoll_Question_OptionComponent
  },
  {
    path: ':id',
    component: AddEditPoll_Question_OptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Poll_Question_OptionRoutingModule { }

