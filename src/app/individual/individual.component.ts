import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../api_responses/character';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {
  character: Character;
  id: number;

  constructor(private route: ActivatedRoute, private charactersService: CharactersService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params.id);
      this.getCharacter(this.id.toString());
    })
  }

  getCharacter(id: string): void {
    this.charactersService.getCharacter(id).subscribe(character => {
      this.character = character;
    });
  }
}
