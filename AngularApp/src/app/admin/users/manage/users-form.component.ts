import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { UsersService } from '../../../service/users.service';
import { SettingsService } from '../../../service/settings.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class AddEditUsersComponent implements OnInit {

  isEditMode: boolean = false;
  settings_FKgroupList:any[] =[];
settings_FKgroupList:any[] =[];
settings_FKgroupList:any[] =[];

  color: ThemePalette = 'accent';
  data: any;
  formError: any[] = [];
  usersform: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private settingsService: SettingsService,
    private toastr: ToastrService
  ) {
    this.data = {};
    
    this.usersform = new FormGroup({
    'full_name': new FormControl(this.data.full_name, [Validators.required]),
'birth_date': new FormControl(this.data.birth_date, [Validators.required]),
'gender': new FormControl(this.data.gender, [Validators.required]),
'religion': new FormControl(this.data.religion, [Validators.required]),
'email': new FormControl(this.data.email, [Validators.required]),
'country': new FormControl(this.data.country, [Validators.required]),
'city': new FormControl(this.data.city, [Validators.required]),
'geo': new FormControl(this.data.geo, [Validators.required]),
'otp': new FormControl(this.data.otp, [Validators.required]),
'active': new FormControl(this.data.active, [Validators.required]),
'phone': new FormControl(this.data.phone, [Validators.required]),
'password': new FormControl(this.data.password, [Validators.required]),
'fcm_token': new FormControl(this.data.fcm_token, [Validators.required]),

    });
   this.settingsService.getSettings(1, 200, '').then((res: any) => {
 if (res.code === 1) {
   this.settings_FKgroupList = res.document.records;
 } else {
    this.settings_FKgroupList = [];
}});
this.settingsService.getSettings(1, 200, '').then((res: any) => {
 if (res.code === 1) {
   this.settings_FKgroupList = res.document.records;
 } else {
    this.settings_FKgroupList = [];
}});
this.settingsService.getSettings(1, 200, '').then((res: any) => {
 if (res.code === 1) {
   this.settings_FKgroupList = res.document.records;
 } else {
    this.settings_FKgroupList = [];
}});

  }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
     // const userId = params['id'];
     const id= params['id']

      if (id && id!='add') {
        this.usersService.getOneUsers(id).then((res: any) => {
          if (res.code === 1) {
            this.isEditMode = true;
            this.data = res.document;
          } else {
            this.isEditMode = false;
            this.toastr.error("Users not found for edit");
          }
        })
      }
    });
  }

  public confirmSubmit(): void {
    if (this.usersform.valid) {
      if (this.isEditMode) {
        //Edit
        this.usersService.updateUsers(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("users");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
      else {
        //Add
        this.usersService.addUsers(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("users");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    }
  }

}
