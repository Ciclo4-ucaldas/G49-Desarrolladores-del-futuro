import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Factura,
  Pedido,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaPedidoController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Factura has many Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.facturaRepository.pedidos(id).find(filter);
  }

  @post('/facturas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.idFactura,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedidoInFactura',
            exclude: ['idPedido'],
            optional: ['facturaId']
          }),
        },
      },
    }) pedido: Omit<Pedido, 'idPedido'>,
  ): Promise<Pedido> {
    return this.facturaRepository.pedidos(id).create(pedido);
  }

  @patch('/facturas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Factura.Pedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Partial<Pedido>,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.facturaRepository.pedidos(id).patch(pedido, where);
  }

  @del('/facturas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Factura.Pedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.facturaRepository.pedidos(id).delete(where);
  }
}
