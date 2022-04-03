import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { IndividualComponent } from './individual/individual.component';
import { RightArrowIcon } from './components/icons/right-arrow-icon/right-arrow-icon';
import { LeftArrowIcon } from './components/icons/left-arrow-icon/left-arrow-icon';
import { Pagination } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    EpisodesComponent,
    IndividualComponent,
    RightArrowIcon,
    LeftArrowIcon,
    Pagination
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
