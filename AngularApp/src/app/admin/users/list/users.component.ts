import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsers } from '../../../interface/IUsers';
import { SelectionModel } from '@angular/cdk/collections';
import { UsersService } from '../../../service/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns = [
    "id",
"full_name",
"birth_date",
"gender",
"religion",
"email",
"country",
"city",
"geo",
"otp",
"active",
"phone",
"password",
"fcm_token",
"group",
"group",
"group",

    "actions"
  ];
  dataSource: MatTableDataSource<IUsers>;
  selection: SelectionModel<IUsers>;
  pageNo: number;
  pageSize: number;
  searchValue: string;
  totalRecord: number;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private usersService: UsersService,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.pageNo = 0;
    this.pageSize = 20;
    this.searchValue = '';
    this.totalRecord=0;
    this.getUsers(this.pageNo, this.pageSize, '');
  }
  pageEventCall(event?: PageEvent) {
    this.getUsers(event.pageIndex, event.pageSize, this.dataSource.filter);
    return event;
  }
  getUsers(pageNo, pageSize, searchKey) {
    this.usersService.getUsers(pageNo+1, pageSize, searchKey).then((res: any) => {
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
    this.getUsers(this.pageNo, this.pageSize, filter);
  }

  deleteItem(i: number, row: IUsers) {

    if (confirm("Are you sure, you want to delete?")) {
      this.usersService.deleteUsers(row.id).then((res: any) => {
        if (res.code === 1) {
          this.toastr.success(res.message);
          location.reload();
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }
  editItem(i: number, row: IUsers) {
    this.router.navigateByUrl("users/"+row.id);
  }


}

