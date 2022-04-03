import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterApiResponse } from '../api_responses/characterapiresponse';
import { CharactersService } from '../characters.service';
import helper from './helper';


@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characterCall: CharacterApiResponse;
  pages: number[];
  currentPage = 1;
  searchTerm = '';
  pageNumberInput: number;
  paginationObject: any;
  errorMessage = '';
  // timeout: any;

  constructor(
    private charactersService: CharactersService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.fromPage) {
          this.currentPage = Number(params.fromPage);
          this.pageNumberInput = this.currentPage;
          if (Number.isNaN(this.currentPage)) { this.currentPage = 1; }
        }
        if (params.nameSearch) { this.searchTerm = params.nameSearch; }

        this.getCharacters(this.currentPage);
      });
  }

  getCharacters(page = 1): void {
    this.charactersService.getCharacters(page, this.searchTerm).subscribe(characters => {
      console.log(characters);
      this.characterCall = characters;
      this.fillInPageArray(characters.info.pages);
      this.currentPage = page;
      this.getPaginationObject();
    },
      (errorResponse) => {
        console.log(errorResponse);
        this.characterCall = null;
        this.errorMessage = errorResponse.error.error || 'Something went wrong';
      });
  }

  fillInPageArray(total: number): void {
    this.pages = [] as number[];

    for (let counter = 1; counter <= total; counter++) {
      this.pages.push(counter);
    }
  }

  getPaginationObject(): any {
    this.paginationObject = helper.paginate(this.characterCall.info.count, this.currentPage, 20, 3)
  }

  handlePageChange(page: number): void {
    console.log('changing page', page);
    this.pageNumberInput = page;
    this.router.navigate([], {
      queryParams: {
        fromPage: page,
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    })
  }

  handleSearch(): void {
    console.log('bow searrching');
    this.debounce(() => {
      this.router.navigate([], {
        queryParams: {
          nameSearch: this.searchTerm,
          fromPage: 1
        },
        relativeTo: this.route,
        queryParamsHandling: 'merge'
      })
    }, 300)
  }

  debounce(callback: Function, delay: number) {
    console.log('called', typeof callback, delay);
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    }
  }
}
