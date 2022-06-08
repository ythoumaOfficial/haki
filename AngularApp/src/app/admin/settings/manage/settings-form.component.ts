import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { SettingsService } from '../../../service/settings.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-settings',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class AddEditSettingsComponent implements OnInit {

  isEditMode: boolean = false;
  
  color: ThemePalette = 'accent';
  data: any;
  formError: any[] = [];
  settingsform: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService,
    
    private toastr: ToastrService
  ) {
    this.data = {};
    
    this.settingsform = new FormGroup({
    'group': new FormControl(this.data.group, [Validators.required]),
'key': new FormControl(this.data.key, [Validators.required]),
'value': new FormControl(this.data.value, [Validators.required]),

    });
   
  }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
     // const userId = params['id'];
     const id= params['id']

      if (id && id!='add') {
        this.settingsService.getOneSettings(id).then((res: any) => {
          if (res.code === 1) {
            this.isEditMode = true;
            this.data = res.document;
          } else {
            this.isEditMode = false;
            this.toastr.error("Settings not found for edit");
          }
        })
      }
    });
  }

  public confirmSubmit(): void {
    if (this.settingsform.valid) {
      if (this.isEditMode) {
        //Edit
        this.settingsService.updateSettings(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("settings");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
      else {
        //Add
        this.settingsService.addSettings(this.data).then((res: any) => {
          if (res.code === 1) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("settings");
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    }
  }

}
