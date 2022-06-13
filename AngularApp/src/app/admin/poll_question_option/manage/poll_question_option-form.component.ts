import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Poll_Question_OptionService } from '../../../service/poll_question_option.service';
import { Poll_QuestionService } from '../../../service/poll_question.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-poll_question_option',
  templateUrl: './poll_question_option-form.component.html',
  styleUrls: ['./poll_question_option-form.component.scss']
})
export class AddEditPoll_Question_OptionComponent implements OnInit {

  isEditMode: boolean = false;

  color: ThemePalette = 'accent';
  data: any;
  formError: any[] = [];
  poll_question_FK: any[] = [];
  poll_question_optionform: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private poll_question_optionService: Poll_Question_OptionService,
    private poll_question_Service: Poll_QuestionService,

    private toastr: ToastrService
  ) {
    this.data = {};

    this.poll_question_optionform = new FormGroup({
      'option': new FormControl(this.data.option, [Validators.required]),
      'poll_question_id': new FormControl(this.data.poll_question_id, [Validators.required]),

    });
    this.poll_question_Service.getPoll_Question(1, 200, '').then((res: any) => {
      if (res.code === 1) {
        this.poll_question_FK = res.document.records;
      } else {
        this.poll_question_FK = [];
      }
    });

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      // const userId = params['id'];
      const id = params['id']

      if (id && id != 'add') {
        this.poll_question_optionService.getOnePoll_Question_Option(id).then((res: any) => {
          if (res.code === 1) {
            this.isEditMode = true;
            this.data = res.document;
          } else {
            this.isEditMode = false;
            this.toastr.error("Poll_Question_Option not found for edit");
          }
        })
      }
    });
  }

  public confirmSubmit(): void {
    if (this.poll_question_optionform.valid) {
      if (this.isEditMode) {
        //Edit
        this.poll_question_optionService.updatePoll_Question_Option(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("poll_question_option");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
      else {
        //Add
        this.poll_question_optionService.addPoll_Question_Option(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("poll_question_option");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    }
  }

}
