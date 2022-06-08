import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { PollService } from '../../../service/poll.service';
import { CategoryService } from '../../../service/category.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-poll',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class AddEditPollComponent implements OnInit {

  isEditMode: boolean = false;
  category_FKnameList:any[] =[];

  color: ThemePalette = 'accent';
  data: any;
  formError: any[] = [];
  pollform: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pollService: PollService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.data = {};
    
    this.pollform = new FormGroup({
    'name': new FormControl(this.data.name, [Validators.required]),
'description': new FormControl(this.data.description, [Validators.required]),
'category_id': new FormControl(this.data.category_id, [Validators.required]),

    });
   this.categoryService.getCategory(1, 200, '').then((res: any) => {
 if (res.code === 1) {
   this.category_FKnameList = res.document.records;
 } else {
    this.category_FKnameList = [];
}});

  }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
     // const userId = params['id'];
     const id= params['id']

      if (id && id!='add') {
        this.pollService.getOnePoll(id).then((res: any) => {
          if (res.code === 1) {
            this.isEditMode = true;
            this.data = res.document;
          } else {
            this.isEditMode = false;
            this.toastr.error("Poll not found for edit");
          }
        })
      }
    });
  }

  public confirmSubmit(): void {
    if (this.pollform.valid) {
      if (this.isEditMode) {
        //Edit
        this.pollService.updatePoll(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("poll");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
      else {
        //Add
        this.pollService.addPoll(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("poll");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    }
  }

}
