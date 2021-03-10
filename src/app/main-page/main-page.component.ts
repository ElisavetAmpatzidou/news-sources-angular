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
  pageIndex = 1;
  searchName = "a";
  categoryName = "";
  destroyedSubject = new Subject();



  constructor(private newsService: NewsApiServiceService, private dataService: DataServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    
    this.newsService.getSources(this.searchName, this.categoryName, this.pageIndex.toString()).pipe(withLatestFrom(this.route.queryParams), takeUntil(this.destroyedSubject)).subscribe(
      ([data, queryParam]) => {
        this.newsSource = data;
        this.router.navigate([], { relativeTo: this.route, queryParams: { search: this.searchName, category: this.categoryName, page: this.pageIndex.toString() }, queryParamsHandling: 'merge' });

        this.pageIndex = queryParam.page - 1;
        this.searchName = queryParam.searchName;
        this.categoryName = queryParam.categoryName;
        this.pageChange({ pageIndex: queryParam.page ? queryParam.page - 1 : 0 });
        this.getNewsSources(this.searchName,this.categoryName,this.pageIndex.toString());


      }
    );


  }

  ngOnDestroy() {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  getNewsSources(searchName: string, categoryName: string, page: string) {
    this.newsService.getSources(searchName, categoryName, page).subscribe(
      (data) => {
        console.warn(data);
        this.newsSource = data;
      }
    )
    this.router.navigate([], { relativeTo: this.route, queryParams: { search: searchName, category: categoryName, page: page }, queryParamsHandling: 'merge' });
  }

  pageChange(event) {
    this.dataService.newPage(event.pageIndex + 1);
  }

}

