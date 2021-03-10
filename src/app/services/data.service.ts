import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
  searchSubject = new Subject<string>();
  categorySubject = new Subject<string>();
  pageSubject = new Subject<number>();

  constructor() { }

  
  newSearch(searchName: string){
    this.searchSubject.pipe(debounceTime(300)).subscribe();
    this.searchSubject.next(searchName);
  }

  newCategory(categoryName: string){
    this.categorySubject.next(categoryName);
  }
  
  newPage(page: number){
    this.pageSubject.next(page);
  }


}
