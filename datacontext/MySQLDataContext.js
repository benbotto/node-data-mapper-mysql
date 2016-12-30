'use strict';

require('insulin').factory('ndm_MySQLDataContext',
  ['ndm_DataContext', 'ndm_MySQLEscaper', 'ndm_MySQLQueryExecuter',
   'ndm_MySQLInsert'],
  ndm_MySQLDataContextProducer);

function ndm_MySQLDataContextProducer(DataContext, MySQLEscaper, MySQLQueryExecuter,
  MySQLInsert) {
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
  }

  return MySQLDataContext;
}

