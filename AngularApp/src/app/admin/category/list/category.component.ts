import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from '../../../interface/ICategory';
import { SelectionModel } from '@angular/cdk/collections';
import { CategoryService } from '../../../service/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  displayedColumns = [
    "id",
"name",

    "actions"
  ];
  dataSource: MatTableDataSource<ICategory>;
  selection: SelectionModel<ICategory>;
  pageNo: number;
  pageSize: number;
  searchValue: string;
  totalRecord: number;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private categoryService: CategoryService,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.pageNo = 0;
    this.pageSize = 20;
    this.searchValue = '';
    this.totalRecord=0;
    this.getCategory(this.pageNo, this.pageSize, '');
  }
  pageEventCall(event?: PageEvent) {
    this.getCategory(event.pageIndex, event.pageSize, this.dataSource.filter);
    return event;
  }
  getCategory(pageNo, pageSize, searchKey) {
    this.categoryService.getCategory(pageNo+1, pageSize, searchKey).then((res: any) => {
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
    this.getCategory(this.pageNo, this.pageSize, filter);
  }

  deleteItem(i: number, row: ICategory) {

    if (confirm("Are you sure, you want to delete?")) {
      this.categoryService.deleteCategory(row.id).then((res: any) => {
        if (res.code === 1) {
          this.toastr.success(res.message);
          location.reload();
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }
  editItem(i: number, row: ICategory) {
    this.router.navigateByUrl("category/"+row.id);
  }


}

