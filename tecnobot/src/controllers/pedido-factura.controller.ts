import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Factura,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoFacturaController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.string('id') id: typeof Pedido.prototype.idPedido,
  ): Promise<Factura> {
    return this.pedidoRepository.suFactura(id);
  }
}
