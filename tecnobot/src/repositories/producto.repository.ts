import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Producto, ProductoRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.idProducto,
  ProductoRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Producto.prototype.idProducto>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Producto, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
