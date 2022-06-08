import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Poll_Voting_HistoryComponent } from './list/Poll_voting_history.component';
import { AddEditPoll_Voting_HistoryComponent } from './manage/Poll_voting_history-form.component';

const routes: Routes = [
  {
    path: '',
    component: Poll_Voting_HistoryComponent
  },
  {
    path: 'add',
    component: AddEditPoll_Voting_HistoryComponent
  },
  {
    path: ':id',
    component: AddEditPoll_Voting_HistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Poll_Voting_HistoryRoutingModule { }

