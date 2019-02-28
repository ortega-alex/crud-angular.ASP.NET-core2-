import { Direccion } from "./Direccion";

export interface Persona {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  direcciones: Array<Direccion>;
}
