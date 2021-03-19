import { Component, OnInit, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';
import { NewsApiServiceService } from '../services/news-api.service';
import { Sources } from '../models/Sorces';


import {  takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  newsSource: Sources;
  pageIndex;
  search = 'a';
  category = '';
  destroyedSubject = new Subject();

  

  constructor(private newsService: NewsApiServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroyedSubject)).subscribe(
      ( queryParam) => {
          this.search = queryParam.q || 'a';
          this.category = queryParam.category || '';
          this.pageIndex = queryParam.page-1 || 0;
          this.getNewsSources(this.search, this.category, this.pageIndex);
      });


  }

  ngOnDestroy() {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  getNewsSources(searchName: string, categoryName: string, page: number) {
    this.router.navigate(['/main-page'], { queryParams: { q: searchName, category: categoryName, page: page}, queryParamsHandling: 'merge' });
    this.newsService.getSources(searchName, categoryName, page).pipe(takeUntil(this.destroyedSubject)).subscribe(
      (data) => {
        this.newsSource = data;
      });
  }
  pageChange(event) {
    console.log(event);

    this.router.navigate(['/main-page'], { queryParams: { page: (event.pageIndex + 1) }, queryParamsHandling: 'merge' });

    this.pageIndex = event.pageIndex;


  }

}

