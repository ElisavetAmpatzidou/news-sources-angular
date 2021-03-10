import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
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

  constructor(private fb: FormBuilder, private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      searchName: '',
      categoryName: ''
    });

  }
  searchChange(){
    this.dataService.newSearch(this.filterForm.value.searchName);
    console.log(this.filterForm.value.searchName);
    
  }

  categoryChange(){
    this.dataService.newCategory(this.filterForm.value.categoryName);
    console.log(this.filterForm.value.categoryName);
  }
  
  
}
