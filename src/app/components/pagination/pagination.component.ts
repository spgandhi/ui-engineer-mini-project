import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationObject } from 'src/app/api_responses/paginationObject';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
})
export class Pagination implements OnInit {

  @Input() data: PaginationObject;
  @Output() onPageChange = new EventEmitter<number>();

  ngOnInit(): void { }

  handlePageChange(page: number): void {
    this.onPageChange.emit(page);
  }
}
