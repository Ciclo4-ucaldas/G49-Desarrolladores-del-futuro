import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Vendedor, VendedorRelations, Usuario, Factura} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {FacturaRepository} from './factura.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.idVendedor,
  VendedorRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Vendedor.prototype.idVendedor>;

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Vendedor.prototype.idVendedor>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Vendedor, dataSource);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
