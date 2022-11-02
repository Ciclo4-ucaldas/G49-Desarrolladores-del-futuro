import {Entity, model, property} from '@loopback/repository';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idFactura?: string;

  @property({
    type: 'string',
    required: true,
  })
  idVendedor: string;

  @property({
    type: 'string',
    required: true,
  })
  idPedido: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoFactura: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: string;


  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
