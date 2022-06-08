export const childRoutes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./upload/upload.module').then(m => m.UploadModule),
    data: { icon: 'upload', text: 'Upload' }
  },
  









































{   path: 'Poll_voting_history',   loadChildren: () =>     import('./Poll_voting_history/Poll_voting_history.module').then(m => m.Poll_Voting_HistoryModule),   data: { icon: 'table_chart', text: 'Poll_Voting_History' }},{   path: 'category',   loadChildren: () =>     import('./category/category.module').then(m => m.CategoryModule),   data: { icon: 'table_chart', text: 'Category' }},{   path: 'poll',   loadChildren: () =>     import('./poll/poll.module').then(m => m.PollModule),   data: { icon: 'table_chart', text: 'Poll' }},{   path: 'poll_question',   loadChildren: () =>     import('./poll_question/poll_question.module').then(m => m.Poll_QuestionModule),   data: { icon: 'table_chart', text: 'Poll_Question' }},{   path: 'poll_question_option',   loadChildren: () =>     import('./poll_question_option/poll_question_option.module').then(m => m.Poll_Question_OptionModule),   data: { icon: 'table_chart', text: 'Poll_Question_Option' }},{   path: 'settings',   loadChildren: () =>     import('./settings/settings.module').then(m => m.SettingsModule),   data: { icon: 'table_chart', text: 'Settings' }},{   path: 'users',   loadChildren: () =>     import('./users/users.module').then(m => m.UsersModule),   data: { icon: 'table_chart', text: 'Users' }},
];

