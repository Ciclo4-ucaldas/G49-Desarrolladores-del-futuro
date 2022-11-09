import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Factura} from './factura.model';
import {Producto} from './producto.model';
import {PedidosxProductos} from './pedidosx-productos.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPedido?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @belongsTo(() => Cliente, {name: 'suCliente'})
  clienteId: string;

  @belongsTo(() => Factura, {name: 'suFactura'})
  facturaId: string;

  @hasMany(() => Producto, {through: {model: () => PedidosxProductos}})
  productos: Producto[];

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
