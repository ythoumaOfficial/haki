import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './list/category.component';
import { AddEditCategoryComponent } from './manage/category-form.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent
  },
  {
    path: 'add',
    component: AddEditCategoryComponent
  },
  {
    path: ':id',
    component: AddEditCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }

