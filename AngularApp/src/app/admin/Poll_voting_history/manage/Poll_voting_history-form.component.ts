import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Poll_Voting_HistoryService } from '../../../service/Poll_voting_history.service';
import { UsersService } from '../../../service/users.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-Poll_voting_history',
  templateUrl: './Poll_voting_history-form.component.html',
  styleUrls: ['./Poll_voting_history-form.component.scss']
})
export class AddEditPoll_Voting_HistoryComponent implements OnInit {

  isEditMode: boolean = false;
  users_FKfull_nameList: any[] = [];

  color: ThemePalette = 'accent';
  data: any;
  formError: any[] = [];
  Poll_voting_historyform: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private Poll_voting_historyService: Poll_Voting_HistoryService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
    this.data = {};

    this.Poll_voting_historyform = new FormGroup({
      'option': new FormControl(this.data.option, [Validators.required]),
      'poll_question_id': new FormControl(this.data.poll_question_id, [Validators.required]),
      'poll_question_option_id': new FormControl(this.data.poll_question_option_id, [Validators.required]),
      'user_id': new FormControl(this.data.user_id, [Validators.required]),

    });
    this.usersService.getUsers(1, 200, '').then((res: any) => {
      if (res.code === 1) {
        this.users_FKfull_nameList = res.document.records;
      } else {
        this.users_FKfull_nameList = [];
      }
    });

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      // const userId = params['id'];
      const id = params['id']

      if (id && id != 'add') {
        this.Poll_voting_historyService.getOnePoll_Voting_History(id).then((res: any) => {
          if (res.code === 1) {
            this.isEditMode = true;
            this.data = res.document;
          } else {
            this.isEditMode = false;
            this.toastr.error("Poll_Voting_History not found for edit");
          }
        })
      }
    });
  }

  public confirmSubmit(): void {
    if (this.Poll_voting_historyform.valid) {
      if (this.isEditMode) {
        //Edit
        this.Poll_voting_historyService.updatePoll_Voting_History(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("Poll_voting_history");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
      else {
        //Add
        this.Poll_voting_historyService.addPoll_Voting_History(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("Poll_voting_history");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    }
  }

}
