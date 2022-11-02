import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Factura, FacturaRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.idFactura,
  FacturaRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Factura.prototype.idFactura>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Factura, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
