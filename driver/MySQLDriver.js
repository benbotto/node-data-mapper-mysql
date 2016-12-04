'use strict';

require('insulin').factory('ndm_MySQLDriver',
  ['mysql', 'ndm_MySQLDataContext', 'ndm_informationSchemaDatabase',
  'ndm_MySQLSchemaGenerator', 'ndm_Database'],
  ndm_MySQLDriverProducer);

function ndm_MySQLDriverProducer(mysql, MySQLDataContext, isDB,
  MySQLSchemaGenerator, Database) {
  /**
   * A MySQL Driver for the node-data-mapper ORM.
   */
  class MySQLDriver {
    /**
     * Initialize the driver.
     * @param {Object} conOpts - An object containing connection options
     * suitable for the mysql constructor ({@link
     * https://github.com/mysqljs/mysql#connection-options}).
     */
    constructor(conOpts) {
      this.conOpts = conOpts;

      // Create a DataContext instance for the information_schema database.
      const isConOpts = Object.assign({}, this.conOpts, {database: 'information_schema'});
      const isCon     = mysql.createConnection(isConOpts);
      const isDC      = new MySQLDataContext(isDB, isCon);

      /**
       * A MySQLSchemaGenerator instance.  The user can attach event handlers
       * to the ADD_TABLE and ADD_COLUMN events.
       * @type {MySQLSchemaGenerator}
       * @name MySQLDriver#generator
       * @public
       */
      this.generator = new MySQLSchemaGenerator(isDC);
    }

    /**
     * Initialize the database schema, connection pool, and Datacontext
     * instance.
     * @return {Promise<DataContext>} A Promise that is resolved with a
     * DataContext instance, which can be used for querying the database.
     */
    initialize() {
      // Generate the schema, then create the DataContext instance.
      return this.generator
        .generateSchema(this.conOpts.database)
        .then(schema =>
          new MySQLDataContext(new Database(schema), mysql.createPool(this.conOpts)));
    }
  }

  return MySQLDriver;
}

