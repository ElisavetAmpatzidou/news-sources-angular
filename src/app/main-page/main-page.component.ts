import { Component, OnInit, EventEmitter } from '@angular/core';

import { combineLatest, Subject } from 'rxjs';
import { NewsApiServiceService } from '../services/news-api.service';
import { Sources } from '../models/Sorces';


import { debounceTime, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { DataServiceService } from '../services/data.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  newsSource: Sources;
  pageIndex ;
  //page = '1';
  search = 'a';
  category = '';
  destroyedSubject = new Subject();


  constructor(private newsService: NewsApiServiceService, private dataService: DataServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    combineLatest([
      this.dataService.searchSubject,
      this.dataService.categorySubject,
      this.dataService.pageSubject
    ]).pipe(withLatestFrom(this.route.queryParams), takeUntil(this.destroyedSubject)).subscribe(
      ([[search, category, pageIndex], queryParam]) => {
          this.search = queryParam.q || search;
          this.category = queryParam.category || category;
          this.pageIndex = queryParam.page-1 || 0;
          this.getNewsSources(this.search, this.category, this.pageIndex);
      });

  }

  ngOnDestroy() {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  getNewsSources(searchName: string, categoryName: string, page: number) {
    this.newsService.getSources(searchName, categoryName, page).pipe(takeUntil(this.destroyedSubject)).subscribe(
      (data) => {
        console.log("get data" + searchName + categoryName + page);
        console.warn(data);
        this.newsSource = data;
      }
    )
    this.router.navigate(['/main-page'], { queryParams: { q: searchName, category: categoryName, page: (page + 1) }, queryParamsHandling: 'merge' });
  }
  pageChange(event) {
    console.log(event);
    this.dataService.pageSubject.next(event.pageIndex);
    
    this.router.navigate(['/main-page'], { queryParams: { page: (event.pageIndex+1 )}, queryParamsHandling: 'merge' });

    this.pageIndex = event.pageIndex;
    

  }

}

