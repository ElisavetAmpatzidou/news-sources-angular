import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DataServiceService } from '../services/data.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  categories = [
    'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
  ];
  filterForm :FormGroup;
  destroyedSubject = new Subject();

  constructor(private dataService: DataServiceService, private router: Router) { }

  ngOnInit(): void {
    this. filterForm = new FormGroup({
      searchName: new FormControl('a'),
      categoryName: new FormControl('')
    });
    this.filterForm.get('searchName').valueChanges.pipe(debounceTime(300), takeUntil(this.destroyedSubject)).subscribe((s)=>{
      this.dataService.searchSubject.next(s);
      this.router.navigate(['/main-page'], { queryParams: { q: s}, queryParamsHandling: 'merge' });
    });
    this.filterForm.get('categoryName').valueChanges.pipe(takeUntil(this.destroyedSubject)).subscribe((c)=>{
      this.dataService.categorySubject.next(c);
      this.router.navigate(['/main-page'], { queryParams: { category: c }, queryParamsHandling: 'merge' });
    });
    


  }
  ngOnDestroy() {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
