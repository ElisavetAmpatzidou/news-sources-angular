import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup} from '@angular/forms';
import {  Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DataServiceService } from '../services/data.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() public newsSource;
  
  
  categories = [
    'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
  ]
  filterForm : FormGroup;
  destroyedSubject = new Subject();

  constructor(private fb: FormBuilder, private dataService: DataServiceService, private router:Router) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      searchName: '',
      categoryName: ''
    });
    
   
    this.filterForm.valueChanges.pipe(takeUntil(this.destroyedSubject)).subscribe((n) => {
        this.dataService.newSearch(n.searchName, n.categoryName, 1);
        this.router.navigate(['/main-page'], { queryParams: {search: n.searchName,category: n.categoryName,page: 1},queryParamsHandling: 'merge',});
      });
  }
  ngOnDestroy() {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  
}
