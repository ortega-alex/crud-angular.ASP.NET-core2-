import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  private personas: Array<Persona>;

  constructor(
    private personaService: PersonaService
  ) {
    this.personas = [];
  }

  ngOnInit() {
    this.cargarData();
  }

  private cargarData(): void {
    this.personaService.getPeronas().subscribe((personas) => {
      this.personas = personas;
    }, error => console.log("err: ", error.toString()));
  }

  public delete(persona: Persona) {
    this.personaService.deletePersona(persona.id.toString())
      .subscribe(persona => this.cargarData(),
        error => console.error(error));
  }
}
