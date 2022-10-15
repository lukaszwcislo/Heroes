import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { debounceTime, fromEvent, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  @ViewChild('inputSearchName') inputSearchName!: ElementRef<HTMLInputElement>;
  @Output() emitSearchName = new EventEmitter<Event>();

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const searchName: Observable<Event> = fromEvent(
      this.inputSearchName.nativeElement,
      'input'
    );
    searchName.pipe(debounceTime(500)).subscribe((inputEvent: Event) => {
      this.emitSearchName.emit(inputEvent);
    });

    this.inputSearchName.nativeElement.value = this.route.snapshot.queryParams[
      'name'
    ]
      ? this.route.snapshot.queryParams['name']
      : '';
  }
}
