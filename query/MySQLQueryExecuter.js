'use strict';

require('insulin').factory('ndm_MySQLQueryExecuter',
  ['ndm_QueryExecuter'], ndm_MySQLQueryExecuterProducer);

function ndm_MySQLQueryExecuterProducer(QueryExecuter) {
  /**
   * A QueryExecuter extensions specialized for MySQL.
   */
  class MySQLQueryExecuter extends QueryExecuter {
    /**
     * Initialize the QueryExecuter instance.
     * @param {Object} pool - A MySQL connection pool instance (or a single
     * connection).  It is the user's responsibility to end the pool when the
     * application closes.
     */
    constructor(pool) {
      super();

      /**
       * A MySQL connection pool instance.
       * @type {Object}
       * @name MySQLQueryExecuter#pool
       * @see {@link https://github.com/mysqljs/mysql#pooling-connections}
       * @public
       */
      this.pool = pool;
    }

    /**
     * Execute a select query.
     * @param {string} query - The SQL to execute.
     * @param {Object} params - An object containing query parameters for the
     * query.  Each parameter will be preceded with a colon in query.
     * @param {QueryExecuter~selectCallback} callback - A callback function
     * that is called after the query is executed.
     * @return {void}
     */
    select(query, params, callback) {
      this.pool.query(query, params, callback);
    }

    /**
     * Execute an insert query.
     * @param {string} query - The SQL to execute.
     * @param {Object} params - An object containing query parameters for the
     * query.  Each parameter will be preceded with a colon in query.
     * @param {QueryExecuter~insertCallback} callback - A callback function
     * that is called after the query is executed.
     * @return {void}
     */
    insert(query, params, callback) {
      this.pool.query(query, params, callback);
    }

    /**
     * Execute an update query.
     * @param {string} query - The SQL to execute.
     * @param {Object} params - An object containing query parameters for the
     * query.  Each parameter will be preceded with a colon in query.
     * @param {QueryExecuter~mutateCallback} callback - A callback function
     * that is called after the query is executed.
     * @return {void}
     */
    update(query, params, callback) {
      this.pool.query(query, params, callback);
    }

    /**
     * Execute a delete query.
     * @param {string} query - The SQL to execute.
     * @param {Object} params - An object containing query parameters for the
     * query.  Each parameter will be preceded with a colon in query.
     * @param {QueryExecuter~mutateCallback} callback - A callback function
     * that is called after the query is executed.
     * @return {void}
     */
    delete(query, params, callback) {
      this.pool.query(query, params, callback);
    }
  }

  return MySQLQueryExecuter;
}

