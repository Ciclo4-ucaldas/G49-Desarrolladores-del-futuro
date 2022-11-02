import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pedido} from './pedido.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idFactura?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  EstadoFactura: boolean;

  @property({
    type: 'date',
    required: true,
  })
  FechaRegistro: string;

  @property({
    type: 'string',
  })
  vendedorId?: string;

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
