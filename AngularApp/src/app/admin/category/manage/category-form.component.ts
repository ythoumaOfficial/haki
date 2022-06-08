import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CategoryService } from '../../../service/category.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class AddEditCategoryComponent implements OnInit {

  isEditMode: boolean = false;
  
  color: ThemePalette = 'accent';
  data: any;
  formError: any[] = [];
  categoryform: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    
    private toastr: ToastrService
  ) {
    this.data = {};
    
    this.categoryform = new FormGroup({
    'name': new FormControl(this.data.name, [Validators.required]),

    });
   
  }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
     // const userId = params['id'];
     const id= params['id']

      if (id && id!='add') {
        this.categoryService.getOneCategory(id).then((res: any) => {
          if (res.code === 1) {
            this.isEditMode = true;
            this.data = res.document;
          } else {
            this.isEditMode = false;
            this.toastr.error("Category not found for edit");
          }
        })
      }
    });
  }

  public confirmSubmit(): void {
    if (this.categoryform.valid) {
      if (this.isEditMode) {
        //Edit
        this.categoryService.updateCategory(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("category");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
      else {
        //Add
        this.categoryService.addCategory(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("category");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    }
  }

}
