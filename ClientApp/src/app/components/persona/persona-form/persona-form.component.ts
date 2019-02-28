import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DireccionesService } from '../../../services/direcciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../models/persona';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css']
})
export class PersonaFormComponent implements OnInit {

  private modoEdicion: boolean;
  public formGroup: FormGroup;
  private personaId: number;
  private direccionesABorrar: Array<number>;
  private ignorarExistenCambiosPendientes: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private direccionesServices: DireccionesService,
    private personaService: PersonaService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.modoEdicion = false;
    this.direccionesABorrar = [];
    this.ignorarExistenCambiosPendientes = false;
    this.formGroup = this.formBuilder.group({
      nombre: '',
      fechaNacimiento: '',
      direcciones: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }

      this.modoEdicion = true;
      this.personaId = params["id"];
      this.personaService.getPersona(this.personaId.toString()).subscribe((persona) => {
        this.cargarFormularioPersona(persona);
      }, error => console.log("err: ", error.toString()));
    });
  }

  private cargarFormularioPersona(persona: Persona): void {

    var datepipe = new DatePipe('en-DE');
    var format = "yyyy-MM-dd";

    this.formGroup.patchValue({
      nombre: persona.nombre,
      fechaNacimiento: datepipe.transform(persona.fechaNacimiento, format)
    });

    let direcciones = this.formGroup.controls['direcciones'] as FormArray;
    persona.direcciones.forEach(direccion => {
      let direccionFg = this.contruirDireccion();
      direccionFg.patchValue(direccion);
      direcciones.push(direccionFg);
    })
  }

  private contruirDireccion(): FormGroup {
    return this.formBuilder.group({
      id: 0,
      calle: '',
      provincia: '',
      personaId: this.personaId != null ? this.personaId : 0
    });
  }

  public save(): void {
    this.ignorarExistenCambiosPendientes = true;
    let persona: Persona = Object.assign({}, this.formGroup.value);

    if (this.modoEdicion) {
      persona.id = this.personaId;
      this.personaService.updatePersona(persona).subscribe(() => {
        this.borrarPersona();
      }, error => console.log("err: ", error.toString()));
    } else {
      this.personaService.createPersona(persona).subscribe(() => {
        this.onSaveSuccess();
      }, error => console.log("err: ", error.toString()));
    }
  }

  private onSaveSuccess(): void {
    this.router.navigate(["/personas"]);
  }

  private borrarPersona(): void {
    if (this.direccionesABorrar.length === 0) {
      this.onSaveSuccess();
      return;
    }

    this.direccionesServices.deleteDireccion(this.direccionesABorrar).subscribe(() => {
      this.onSaveSuccess();
    }, error => console.log("err: ", error.toString()));
  }

  public agregarDireccion() {
    let direccionArr = this.formGroup.get('direcciones') as FormArray;
    let direccionesFg = this.contruirDireccion();
    direccionArr.push(direccionesFg);
  }

  public existenCambiosPendientes(): boolean {
    if (this.ignorarExistenCambiosPendientes) { return false; }
    return !this.formGroup.pristine;
  }
}
