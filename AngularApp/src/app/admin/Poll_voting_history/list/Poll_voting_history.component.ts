import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPoll_Voting_History } from '../../../interface/IPoll_Voting_History';
import { SelectionModel } from '@angular/cdk/collections';
import { Poll_Voting_HistoryService } from '../../../service/Poll_voting_history.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-Poll_voting_history',
  templateUrl: './Poll_voting_history.component.html',
  styleUrls: ['./Poll_voting_history.component.scss']
})
export class Poll_Voting_HistoryComponent implements OnInit {
  displayedColumns = [
    "id",
"option",
"poll_question_id",
"poll_question_option_id",
"user_id",
"full_name",

    "actions"
  ];
  dataSource: MatTableDataSource<IPoll_Voting_History>;
  selection: SelectionModel<IPoll_Voting_History>;
  pageNo: number;
  pageSize: number;
  searchValue: string;
  totalRecord: number;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private Poll_voting_historyService: Poll_Voting_HistoryService,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.pageNo = 0;
    this.pageSize = 20;
    this.searchValue = '';
    this.totalRecord=0;
    this.getPoll_Voting_History(this.pageNo, this.pageSize, '');
  }
  pageEventCall(event?: PageEvent) {
    this.getPoll_Voting_History(event.pageIndex, event.pageSize, this.dataSource.filter);
    return event;
  }
  getPoll_Voting_History(pageNo, pageSize, searchKey) {
    this.Poll_voting_historyService.getPoll_Voting_History(pageNo+1, pageSize, searchKey).then((res: any) => {
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
    this.getPoll_Voting_History(this.pageNo, this.pageSize, filter);
  }

  deleteItem(i: number, row: IPoll_Voting_History) {

    if (confirm("Are you sure, you want to delete?")) {
      this.Poll_voting_historyService.deletePoll_Voting_History(row.id).then((res: any) => {
        if (res.code === 1) {
          this.toastr.success(res.message);
          location.reload();
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }
  editItem(i: number, row: IPoll_Voting_History) {
    this.router.navigateByUrl("Poll_voting_history/"+row.id);
  }


}

