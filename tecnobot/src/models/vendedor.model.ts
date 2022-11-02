import {model, property} from '@loopback/repository';
import {Usuario} from '.';

@model()
export class Vendedor extends Usuario {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idVendedor?: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;


  constructor(data?: Partial<Vendedor>) {
    super(data);
  }
}

export interface VendedorRelations {
  // describe navigational properties here
}

export type VendedorWithRelations = Vendedor & VendedorRelations;
