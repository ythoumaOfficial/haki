import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollComponent } from './list/poll.component';
import { AddEditPollComponent } from './manage/poll-form.component';

const routes: Routes = [
  {
    path: '',
    component: PollComponent
  },
  {
    path: 'add',
    component: AddEditPollComponent
  },
  {
    path: ':id',
    component: AddEditPollComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRoutingModule { }

