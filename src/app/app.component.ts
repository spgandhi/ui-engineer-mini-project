import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  characterPage = 1;
  characterNameSearch = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
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
