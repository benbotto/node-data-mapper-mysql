describe('MySQLDataContext()', function() {
  'use strict';

  const insulin          = require('insulin');
  const MySQLDataContext = insulin.get('ndm_MySQLDataContext');
  const db               = insulin.get('ndm_testDB');
  const pool             = {};

  // Helper function to "clone" the db instance.
  function cloneDB() {
    const Database = insulin.get('ndm_Database');

    return new Database(JSON.parse(JSON.stringify(db)));
  }

  /**
   * Ctor.
   */
  describe('.constructor()', function() {
    it('extends DataContext.', function() {
      const dc          = new MySQLDataContext(db, pool);
      const DataContext = insulin.get('ndm_DataContext');

      expect(dc instanceof DataContext).toBe(true);
    });

    it('passes the pool to the MySQLQueryExecuter constructor.', function() {
      const dc = new MySQLDataContext(db, pool);
      expect(dc.queryExecuter.pool).toBe(pool);
    });
  });

  /**
   * Insert.
   */
  describe('.insert()', function() {
    it('returns an MySQLInsert instance.', function() {
      const dc          = new MySQLDataContext(db, pool);
      const insert      = dc.insert({});
      const MySQLInsert = insulin.get('ndm_MySQLInsert');

      expect(insert instanceof MySQLInsert).toBe(true);
    });

    it('accepts an optional database argument, and passes it to the MySQLInsert ctor.', function() {
      const dc     = new MySQLDataContext(db, pool);
      const db2    = cloneDB();
      const insert = dc.insert({}, db2);

      expect(insert.database).toBe(db2);
    });
  });

  /**
   * From.
   */
  describe('.from()', function() {
    it('returns a MySQLFromAdapter instance.', function() {
      const dc               = new MySQLDataContext(db, pool);
      const from             = dc.from({table: 'users'});
      const MySQLFromAdapter = insulin.get('ndm_MySQLFromAdapter');

      expect(from instanceof MySQLFromAdapter).toBe(true);
    });

    it('accepts an optional database argument, and passes it to the MySQLFromAdapter ctor.',
      function() {
      const dc   = new MySQLDataContext(db, pool);
      const db2  = cloneDB();
      const from = dc.from({table: 'users'}, db2);

      expect(from.database).toBe(db2);
    });
  });
});

