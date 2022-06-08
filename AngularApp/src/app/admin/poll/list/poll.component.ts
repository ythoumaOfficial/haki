import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPoll } from '../../../interface/IPoll';
import { SelectionModel } from '@angular/cdk/collections';
import { PollService } from '../../../service/poll.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  displayedColumns = [
    "id",
"name",
"description",
"category_id",
"name",

    "actions"
  ];
  dataSource: MatTableDataSource<IPoll>;
  selection: SelectionModel<IPoll>;
  pageNo: number;
  pageSize: number;
  searchValue: string;
  totalRecord: number;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private pollService: PollService,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.pageNo = 0;
    this.pageSize = 20;
    this.searchValue = '';
    this.totalRecord=0;
    this.getPoll(this.pageNo, this.pageSize, '');
  }
  pageEventCall(event?: PageEvent) {
    this.getPoll(event.pageIndex, event.pageSize, this.dataSource.filter);
    return event;
  }
  getPoll(pageNo, pageSize, searchKey) {
    this.pollService.getPoll(pageNo+1, pageSize, searchKey).then((res: any) => {
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
    this.getPoll(this.pageNo, this.pageSize, filter);
  }

  deleteItem(i: number, row: IPoll) {

    if (confirm("Are you sure, you want to delete?")) {
      this.pollService.deletePoll(row.id).then((res: any) => {
        if (res.code === 1) {
          this.toastr.success(res.message);
          location.reload();
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }
  editItem(i: number, row: IPoll) {
    this.router.navigateByUrl("poll/"+row.id);
  }


}

