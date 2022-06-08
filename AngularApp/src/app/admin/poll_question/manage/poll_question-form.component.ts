import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Poll_QuestionService } from '../../../service/poll_question.service';
import { PollService } from '../../../service/poll.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-poll_question',
  templateUrl: './poll_question-form.component.html',
  styleUrls: ['./poll_question-form.component.scss']
})
export class AddEditPoll_QuestionComponent implements OnInit {

  isEditMode: boolean = false;
  poll_FKnameList:any[] =[];

  color: ThemePalette = 'accent';
  data: any;
  formError: any[] = [];
  poll_questionform: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private poll_questionService: Poll_QuestionService,
    private pollService: PollService,
    private toastr: ToastrService
  ) {
    this.data = {};
    
    this.poll_questionform = new FormGroup({
    'question': new FormControl(this.data.question, [Validators.required]),
'poll_id': new FormControl(this.data.poll_id, [Validators.required]),

    });
   this.pollService.getPoll(1, 200, '').then((res: any) => {
 if (res.code === 1) {
   this.poll_FKnameList = res.document.records;
 } else {
    this.poll_FKnameList = [];
}});

  }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
     // const userId = params['id'];
     const id= params['id']

      if (id && id!='add') {
        this.poll_questionService.getOnePoll_Question(id).then((res: any) => {
          if (res.code === 1) {
            this.isEditMode = true;
            this.data = res.document;
          } else {
            this.isEditMode = false;
            this.toastr.error("Poll_Question not found for edit");
          }
        })
      }
    });
  }

  public confirmSubmit(): void {
    if (this.poll_questionform.valid) {
      if (this.isEditMode) {
        //Edit
        this.poll_questionService.updatePoll_Question(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("poll_question");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
      else {
        //Add
        this.poll_questionService.addPoll_Question(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("poll_question");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    }
  }

}
