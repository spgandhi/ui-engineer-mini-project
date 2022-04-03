import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationObject } from 'src/app/api_responses/paginationObject';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
})
export class Pagination implements OnInit {
  @Input() data: PaginationObject;
  @Output() onPageChange = new EventEmitter<number>();

  pageNumberInput: number;

  constructor() { }
  ngOnInit(): void {
    this.pageNumberInput = this.data.currentPage;
  }

  handlePageChange(page: number): void {
    this.onPageChange.emit(page);
  }
}
