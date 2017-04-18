import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { HackernewsApiService } from '../hackernews-api.service';


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  //items: number[];
  items;

  typeSub: any;
  pageSub: any;
  storiesType;
  pageNum: number;
  listStart: number;

  constructor(
    private _hackerNewsAPIService: HackernewsApiService,
    private route: ActivatedRoute
    ) { 
    //this.items = Array(30);
  }

  ngOnInit() {
    /*
    this._hackerNewsAPIService.fetchStories()
                              .subscribe(
                                items => this.items = items,
                                error => console.log('Error fetching stories')
                              );
    */
    this.typeSub = this.route
                        .data
                        .subscribe(data => this.storiesType = (data as any).storiesType);
    this.pageSub = this.route
                        .params
                        .subscribe(params => {
                          this.pageNum = +params['page'] ? +params['page'] : 1;
                          this._hackerNewsAPIService.fetchStories(this.storiesType, this.pageNum)
                              .subscribe(
                                items => this.items = items,
                                error => console.log('Error fetching stories' + this.storiesType + 'stories'),
                                () => this.listStart = ((this.pageNum - 1) * 30) + 1);//목록 시작 번호
                          window.scrollTo(0,0);//스크롤 위치 조정(맨 위로), 이 코드가 없으면 스크롤 위치가 변경되지 않음
                        });
    /*
    this._hackerNewsAPIService.fetchStories('news', 1)
                              .subscribe(
                                items => this.items = items,
                                error => console.log('Error fetching stories'));
    */
  }

}
