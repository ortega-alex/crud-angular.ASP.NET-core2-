import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DireccionesService {

  private readonly _URL: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this._URL = baseUrl + "api/direcciones";
  }

  public deleteDireccion(ids: Array<number>): Observable < void> {
    return this.http.post<void>(this._URL + "/delete/list", ids);
  }
}
