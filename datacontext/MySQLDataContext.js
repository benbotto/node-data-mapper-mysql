'use strict';

require('insulin').factory('ndm_MySQLDataContext',
  ['ndm_DataContext', 'ndm_MySQLEscaper', 'ndm_MySQLQueryExecuter',
   'ndm_MySQLInsert', 'ndm_MySQLFromAdapter', 'ndm_MySQLUpdateModel',
   'ndm_MySQLDeleteModel'],
  ndm_MySQLDataContextProducer);

function ndm_MySQLDataContextProducer(DataContext, MySQLEscaper, MySQLQueryExecuter,
  MySQLInsert, MySQLFromAdapter, MySQLUpdateModel, MySQLDeleteModel) {
  /** 
   * A MySQL-specialized DataContext.
   * @extends DatContext
   */
  class MySQLDataContext extends DataContext {
    /**
     * @param {Database} database - A Database instance to query.
     * @param {Object} pool - A MySQL connection pool instance (or a single
     * connection).  It is the user's responsibility to end the pool when the
     * application closes.  See {@link
     * https://github.com/mysqljs/mysql#pooling-connections}
     */
    constructor(database, pool) {
      super(database, new MySQLEscaper(), new MySQLQueryExecuter(pool));
    }

    /**
     * Create a new {@link MySQLInsert} instance.
     * @param {Object} model - See the {@link MySQLInsert} constructor.
     * @param {Database} [database] - An optional Database instance.  If
     * passed, this parameter is used instead of the Database that's provided
     * to the ctor.
     * @return {MySQLInsert} An MySQLInsert instance.
     */
    insert(model, database) {
      database = database || this.database;
      return new MySQLInsert(database, this.escaper, this.queryExecuter, model);
    }

    /**
     * Create a new {@link MySQLFromAdapter} instance, which can then be used to
     * SELECT, DELETE, or UPDATE.
     * @see MySQLFromAdapter
     * @see From
     * @param {TableMetaList~TableMeta|string} meta - See the {@link From}
     * constructor.
     * @param {Database} [database] - An optional Database instance.  If
     * passed, this parameter is used instead of the Database that's provided
     * to the ctor.
     * @return {MySQLFromAdapter} A MySQLFromAdapter instance.
     */
    from(meta, database) {
      database = database || this.database;
      return new MySQLFromAdapter(database, this.escaper, this.queryExecuter, meta);
    }

    /**
     * Create a new {@link MySQLUpdateModel} instance that can be used to
     * UPDATE a model by ID.  For complex UPDATE operations, use the {@link
     * DataContext#from} method to obtain a {@link FromAdapter} instance, and
     * then call {@link FromAdapter#update} on that instance.
     * @param {Object} model - See the {@link UpdateModel} constructor.
     * @param {Database} [database] - An optional Database instance.  If
     * passed, this parameter is used instead of the Database that's provided
     * to the ctor.
     * @return {MySQLUpdateModel} A MySQLUpdateModel instance.
     */
    update(model, database) {
      database = database || this.database;
      return new MySQLUpdateModel(database, this.escaper, this.queryExecuter, model);
    }

    /**
     * Create a new {@link MySQLDeleteModel} instance that can be used to
     * delete a model by ID.  For complex DELETE operations, use the {@link
     * DataContext#from} method to obtain a {@link FromAdapter} instance, and
     * then call {@link FromAdapter#delete} on that instance.
     * @param {Object} model - See the {@link DeleteModel} constructor.
     * @param {Database} [database] - An optional Database instance.  If
     * passed, this parameter is used instead of the Database that's provided
     * to the ctor.
     * @return {MySQLDeleteModel} A MySQLDeleteModel instance.
     */
    delete(model, database) {
      database = database || this.database;
      return new MySQLDeleteModel(database, this.escaper, this.queryExecuter, model);
    }

    /**
     * Shortcut to end the connection.
     * @return {void}
     */
    end() {
      this.queryExecuter.pool.end();
    }
  }

  return MySQLDataContext;
}

