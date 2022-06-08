import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ISettings } from '../../../interface/ISettings';
import { SelectionModel } from '@angular/cdk/collections';
import { SettingsService } from '../../../service/settings.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  displayedColumns = [
    "id",
"group",
"key",
"value",

    "actions"
  ];
  dataSource: MatTableDataSource<ISettings>;
  selection: SelectionModel<ISettings>;
  pageNo: number;
  pageSize: number;
  searchValue: string;
  totalRecord: number;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private settingsService: SettingsService,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.pageNo = 0;
    this.pageSize = 20;
    this.searchValue = '';
    this.totalRecord=0;
    this.getSettings(this.pageNo, this.pageSize, '');
  }
  pageEventCall(event?: PageEvent) {
    this.getSettings(event.pageIndex, event.pageSize, this.dataSource.filter);
    return event;
  }
  getSettings(pageNo, pageSize, searchKey) {
    this.settingsService.getSettings(pageNo+1, pageSize, searchKey).then((res: any) => {
      if (res.code === 1) {
        this.pageNo=pageNo;
        this.dataSource = new MatTableDataSource(res.document.records);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalRecord = parseInt(res.document.total_count);
      } else {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.toastr.error(res.message);
      }
    })
  }
  applyFilter(event:string) {
    this.pageNo = 0;
    this.pageSize = 20;
    let filter = this.searchValue.trim().toLowerCase();
    this.getSettings(this.pageNo, this.pageSize, filter);
  }

  deleteItem(i: number, row: ISettings) {

    if (confirm("Are you sure, you want to delete?")) {
      this.settingsService.deleteSettings(row.id).then((res: any) => {
        if (res.code === 1) {
          this.toastr.success(res.message);
          location.reload();
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }
  editItem(i: number, row: ISettings) {
    this.router.navigateByUrl("settings/"+row.id);
  }


}

