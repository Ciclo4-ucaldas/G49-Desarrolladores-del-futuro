import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {PedidosxProductos, PedidosxProductosRelations} from '../models';

export class PedidosxProductosRepository extends DefaultCrudRepository<
  PedidosxProductos,
  typeof PedidosxProductos.prototype.id,
  PedidosxProductosRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(PedidosxProductos, dataSource);
  }
}
