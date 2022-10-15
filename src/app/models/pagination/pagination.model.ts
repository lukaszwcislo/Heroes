export class Pagination {
  public currentPage: number;
  public numberOfPages: number;

  constructor(json: any) {
    this.currentPage = 1;
    this.numberOfPages = json.pages;
  }
}
