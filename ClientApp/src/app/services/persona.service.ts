import { Injectable , Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Persona } from '../models/persona';

@Injectable()
export class PersonaService {

  private readonly _URL: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this._URL = baseUrl + "api/personas";
  }

  public getPeronas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this._URL);
  }

  public getPersona(id: string): Observable<Persona> {
    let params = new HttpParams().set('inclurDireccion', "true");
    return this.http.get<Persona>(this._URL + "/" + id, { params: params });
  }

  public deletePersona(id: string): Observable<Persona> {
    return this.http.delete<Persona>(this._URL + "/" + id);
  }

  public createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this._URL, persona);
  }

  public updatePersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(this._URL + "/" + persona.id.toString() , persona);
  }
}
