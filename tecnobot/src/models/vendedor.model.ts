import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Factura} from './factura.model';

@model()
export class Vendedor extends Entity {
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
  cargo: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  @hasMany(() => Factura)
  facturas: Factura[];

  constructor(data?: Partial<Vendedor>) {
    super(data);
  }
}

export interface VendedorRelations {
  // describe navigational properties here
}

export type VendedorWithRelations = Vendedor & VendedorRelations;
