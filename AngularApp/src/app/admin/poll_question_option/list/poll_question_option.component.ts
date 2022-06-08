import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPoll_Question_Option } from '../../../interface/IPoll_Question_Option';
import { SelectionModel } from '@angular/cdk/collections';
import { Poll_Question_OptionService } from '../../../service/poll_question_option.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-poll_question_option',
  templateUrl: './poll_question_option.component.html',
  styleUrls: ['./poll_question_option.component.scss']
})
export class Poll_Question_OptionComponent implements OnInit {
  displayedColumns = [
    "id",
"option",
"poll_question_id",

    "actions"
  ];
  dataSource: MatTableDataSource<IPoll_Question_Option>;
  selection: SelectionModel<IPoll_Question_Option>;
  pageNo: number;
  pageSize: number;
  searchValue: string;
  totalRecord: number;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private poll_question_optionService: Poll_Question_OptionService,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.pageNo = 0;
    this.pageSize = 20;
    this.searchValue = '';
    this.totalRecord=0;
    this.getPoll_Question_Option(this.pageNo, this.pageSize, '');
  }
  pageEventCall(event?: PageEvent) {
    this.getPoll_Question_Option(event.pageIndex, event.pageSize, this.dataSource.filter);
    return event;
  }
  getPoll_Question_Option(pageNo, pageSize, searchKey) {
    this.poll_question_optionService.getPoll_Question_Option(pageNo+1, pageSize, searchKey).then((res: any) => {
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
    this.getPoll_Question_Option(this.pageNo, this.pageSize, filter);
  }

  deleteItem(i: number, row: IPoll_Question_Option) {

    if (confirm("Are you sure, you want to delete?")) {
      this.poll_question_optionService.deletePoll_Question_Option(row.id).then((res: any) => {
        if (res.code === 1) {
          this.toastr.success(res.message);
          location.reload();
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }
  editItem(i: number, row: IPoll_Question_Option) {
    this.router.navigateByUrl("poll_question_option/"+row.id);
  }


}

