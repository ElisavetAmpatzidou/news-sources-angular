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
  pageIndex;
  searchName;
  categoryName;
  destroyedSubject = new Subject();



  constructor(private newsService: NewsApiServiceService, private dataService: DataServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.dataService.searchSubject.pipe(takeUntil(this.destroyedSubject)).subscribe((s) => {
      this.searchName = s;
    });
    this.dataService.categorySubject.pipe(takeUntil(this.destroyedSubject)).subscribe((c) => {
      this.categoryName = c;
    });
    this.dataService.pageSubject.pipe(takeUntil(this.destroyedSubject)).subscribe((p) => {
      this.pageIndex = p;
    });
    console.log(this.searchName, this.categoryName, this.pageIndex.toString());

    this.getNewsSources(this.searchName, this.categoryName, this.pageIndex.toString());
  }

  ngOnDestroy() {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  getNewsSources(searchName: string, categoryName: string, page: string) {
    this.newsService.getSources(searchName, categoryName, page).pipe(takeUntil(this.destroyedSubject)).subscribe(
      (data) => {
        this.newsSource = data;
      }
    )
    this.router.navigate([], { relativeTo: this.route, queryParams: { search: this.searchName, category: this.categoryName, page: this.pageIndex.toString() }, queryParamsHandling: 'merge' });
  }

}

