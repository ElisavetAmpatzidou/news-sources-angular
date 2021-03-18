import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
  searchSubject = new BehaviorSubject<string>("a"); 
  categorySubject = new BehaviorSubject<string>("");
  pageSubject = new BehaviorSubject<number>(0);
  

  constructor() { }

  
  newSearch(searchName: string, categoryName: string, page: number){
    this.searchSubject.next(searchName);
    this.categorySubject.next(categoryName);
    this.pageSubject.next(page);
  }

  

}
