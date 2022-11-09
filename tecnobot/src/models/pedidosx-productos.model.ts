import {Entity, model, property} from '@loopback/repository';

@model()
export class PedidosxProductos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  constructor(data?: Partial<PedidosxProductos>) {
    super(data);
  }
}

export interface PedidosxProductosRelations {
  // describe navigational properties here
}

export type PedidosxProductosWithRelations = PedidosxProductos & PedidosxProductosRelations;
