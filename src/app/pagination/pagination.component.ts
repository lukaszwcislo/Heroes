import {
  Component,
  Input,
  OnInit,
  OnChanges,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Pagination } from '../models/pagination/pagination.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() pagination!: Pagination;
  @Output() emitPageIndex: EventEmitter<number> = new EventEmitter();
  public numberOfPages!: number[];

  constructor() {}

  public getArrayOfNumbers(pagination: Pagination) {
    const numbers = Array(pagination.numberOfPages)
      .fill(0)
      .map((x, i) => ++i);

    return numbers;
  }

  public changeCurrentPage(page: number) {
    this.emitPageIndex.emit(page);
  }

  private updatePaginationButtons() {
    this.numberOfPages = this.getArrayOfNumbers(this.pagination);
    if (this.numberOfPages.length > 5 && this.pagination.currentPage >= 3) {
      this.numberOfPages = this.numberOfPages.slice(
        this.pagination.currentPage - 3,
        this.pagination.currentPage + 2
      );
    } else if (
      this.numberOfPages.length > 5 &&
      this.pagination.currentPage < 3
    ) {
      this.numberOfPages = this.numberOfPages.slice(0, 6);
    }
  }

  public changePageBy(direction: string) {
    if (direction === 'forward') {
      const pagesRange =
        this.pagination.numberOfPages - this.pagination.currentPage;
      if (pagesRange >= 10) {
        this.changeCurrentPage(this.pagination.currentPage + 10);
      } else {
        this.changeCurrentPage(this.pagination.currentPage + pagesRange);
      }
    } else if (direction === 'backward') {
      const pagesRange = this.pagination.currentPage;

      if (pagesRange > 10) {
        this.changeCurrentPage(this.pagination.currentPage - 10);
      } else {
        this.changeCurrentPage(pagesRange - (pagesRange - 1));
      }
    }
  }

  ngOnInit(): void {
    this.updatePaginationButtons();
  }

  ngOnChanges(): void {
    this.updatePaginationButtons();
  }
}
