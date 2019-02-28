import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PersonaFormComponent } from '../components/persona/persona-form/persona-form.component';

@Injectable()
export class LeaveFormService implements CanDeactivate<PersonaFormComponent> {

  canDeactivate(component: PersonaFormComponent): boolean {
    if (component.existenCambiosPendientes()) {
      return confirm("Tiene cambios pendientes, ¿Desea salir de todos modos?");
    }
    return true;
  }
  constructor() { }

}
