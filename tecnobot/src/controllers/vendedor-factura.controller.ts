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
  Vendedor,
  Factura,
} from '../models';
import {VendedorRepository} from '../repositories';

export class VendedorFacturaController {
  constructor(
    @repository(VendedorRepository) protected vendedorRepository: VendedorRepository,
  ) { }

  @get('/vendedors/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of Vendedor has many Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.vendedorRepository.facturas(id).find(filter);
  }

  @post('/vendedors/{id}/facturas', {
    responses: {
      '200': {
        description: 'Vendedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vendedor.prototype.idVendedor,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInVendedor',
            exclude: ['idFactura'],
            optional: ['vendedorId']
          }),
        },
      },
    }) factura: Omit<Factura, 'idFactura'>,
  ): Promise<Factura> {
    return this.vendedorRepository.facturas(id).create(factura);
  }

  @patch('/vendedors/{id}/facturas', {
    responses: {
      '200': {
        description: 'Vendedor.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.vendedorRepository.facturas(id).patch(factura, where);
  }

  @del('/vendedors/{id}/facturas', {
    responses: {
      '200': {
        description: 'Vendedor.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.vendedorRepository.facturas(id).delete(where);
  }
}
