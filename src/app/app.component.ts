import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  characterPage = 1;
  characterNameSearch = '';

  constructor(private route: ActivatedRoute, public location: Location) { }

  ngOnInit() {
    this.location = this.location;
    this.route.queryParams
      .subscribe(params => {
        if (params.fromPage) {
          const cPageNum = Number(params.fromPage);
          if (!Number.isNaN(cPageNum)) {
            this.characterPage = cPageNum;
          }
        }
        if (params.nameSearch) { this.characterNameSearch = params.nameSearch; }
      });
  }
}
