import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Pedido, PedidoRelations, Cliente, Factura, Producto, PedidosxProductos} from '../models';
import {ClienteRepository} from './cliente.repository';
import {FacturaRepository} from './factura.repository';
import {ProductoRepository} from './producto.repository';
import {PedidosxProductosRepository} from './pedidosx-productos.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.idPedido,
  PedidoRelations
> {

  public readonly suCliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.idPedido>;

  public readonly suFactura: BelongsToAccessor<Factura, typeof Pedido.prototype.idPedido>;

  public readonly susProductos: HasManyRepositoryFactory<Producto, typeof Pedido.prototype.idPedido>;

  public readonly productos: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype.idProducto,
          PedidosxProductos,
          typeof Pedido.prototype.idPedido
        >;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PedidosxProductosRepository') protected pedidosxProductosRepositoryGetter: Getter<PedidosxProductosRepository>,
  ) {
    super(Pedido, dataSource);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productoRepositoryGetter, pedidosxProductosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.susProductos = this.createHasManyRepositoryFactoryFor('susProductos', productoRepositoryGetter,);
    this.registerInclusionResolver('susProductos', this.susProductos.inclusionResolver);
    this.suFactura = this.createBelongsToAccessorFor('suFactura', facturaRepositoryGetter,);
    this.registerInclusionResolver('suFactura', this.suFactura.inclusionResolver);
    this.suCliente = this.createBelongsToAccessorFor('suCliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('suCliente', this.suCliente.inclusionResolver);
  }
}
