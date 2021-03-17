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
  pageIndex = 0;
  page = '1';
  search = 'a';
  category = '';
  destroyedSubject = new Subject();


  constructor(private newsService: NewsApiServiceService, private dataService: DataServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/main-page'], { queryParams: { q: 'a', category: '', page: '1' }, queryParamsHandling: 'merge' });
    combineLatest([
      this.dataService.searchSubject,
      this.dataService.categorySubject,
      this.dataService.pageSubject
    ]).pipe(withLatestFrom(this.route.queryParams), takeUntil(this.destroyedSubject)).subscribe(
      ([[search, category, pageIndex], queryParam]) => {

        this.router.navigate(['/main-page'], { queryParams: { q: 'a', category: '', page: '1' }, queryParamsHandling: 'merge' });
       
        if (queryParam.q || queryParam.category || queryParam.page) {
          this.search = queryParam.q || 'a';
          this.category = queryParam.category || '';
          this.page = queryParam.page || pageIndex;
          this.getNewsSources(this.search, this.category, this.pageIndex);
        }
        else {
          this.getNewsSources(search, category, pageIndex);
        }



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
    this.router.navigate(['/main-page'], { queryParams: { q: searchName, category: categoryName, page: (page + 1).toString() }, queryParamsHandling: 'merge' });
  }
  pageChange(event) {
    this.pageIndex = event.pageIndex;
    this.dataService.pageSubject.next(this.pageIndex);
    this.router.navigate(['/main-page'], { queryParams: { page: (this.pageIndex + 1).toString() }, queryParamsHandling: 'merge' });

  }

}

