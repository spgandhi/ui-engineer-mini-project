import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodeApiResponse } from '../api_responses/episodeapiresponse';
import { PaginationObject } from '../api_responses/paginationObject';
import helper from '../characters/helper';
import { EpisodesService } from '../episodes.service';

@Component({
  selector: 'episodes',
  templateUrl: './episodes.component.html',
})
export class EpisodesComponent implements OnInit {
  episodesCall: EpisodeApiResponse;
  paginationObject: PaginationObject = {
    currentPage: 1,
  };

  constructor(private episodesService: EpisodesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.fromPage) {
          this.paginationObject.currentPage = Number(params.fromPage);
          if (Number.isNaN(this.paginationObject.currentPage)) { this.paginationObject.currentPage = 1; }
        }
        this.getEpisodes(this.paginationObject.currentPage);
      });
  }

  getEpisodes(page = 1): void {
    this.episodesService.getEpisodes(page).subscribe(episodes => {
      this.episodesCall = episodes;
      this.paginationObject = helper.paginate(this.episodesCall.info.count, this.paginationObject.currentPage, 20, 3)
    });
  }

  handlePageChange(page: number): void {
    this.router.navigate([], {
      queryParams: {
        fromPage: page,
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    })
  }
}
