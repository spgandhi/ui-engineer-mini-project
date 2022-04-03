import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterApiResponse } from '../api_responses/characterapiresponse';
import { PaginationObject } from '../api_responses/paginationObject';
import { CharactersService } from '../characters.service';
import helper from './helper';


@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characterCall: CharacterApiResponse;
  searchTerm = '';
  paginationObject: PaginationObject = {
    currentPage: 1,
  };
  errorMessage = '';

  constructor(
    private charactersService: CharactersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.fromPage) {
          this.paginationObject.currentPage = Number(params.fromPage);
          if (Number.isNaN(this.paginationObject.currentPage)) { this.paginationObject.currentPage = 1; }
        }
        if (params.nameSearch) this.searchTerm = params.nameSearch;
        this.getCharacters(this.paginationObject.currentPage);
      });
  }

  getCharacters(page = 1): void {
    this.charactersService.getCharacters(page, this.searchTerm).subscribe(characters => {
      this.errorMessage = null;
      this.characterCall = characters;
      this.paginationObject = helper.paginate(this.characterCall.info.count, this.paginationObject.currentPage, 20, 3)
    },
      (errorResponse) => {
        this.characterCall = null;
        this.errorMessage = errorResponse.error.error || 'Something went wrong';
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

  handleSearch(): void {
    this.router.navigate([], {
      queryParams: {
        nameSearch: this.searchTerm,
        fromPage: 1
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    })

  }
}
