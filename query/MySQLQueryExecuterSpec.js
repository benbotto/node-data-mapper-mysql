describe('MySQLQueryExecuter()', function() {
  'use strict';

  const insulin            = require('insulin');
  const MySQLQueryExecuter = insulin.get('ndm_MySQLQueryExecuter');
  let qe, con;

  beforeEach(function() {
    // Mocked node-mysql connection.
    con = jasmine.createSpyObj('con', ['query']);
    qe  = new MySQLQueryExecuter(con);
  });

  /**
   * Ctor.
   */
  describe('.constructor()', function() {
    it('extends QueryExecuter.', function() {
      const QueryExecuter = insulin.get('ndm_QueryExecuter');

      expect(qe instanceof QueryExecuter).toBe(true);
    });

    it('exposes a "pool" object.', function() {
      expect(qe.pool).toBe(con);
    });
  });

  /**
   * Select.
   */
  describe('.select()', function() {
    it('uses pool.query() to execute the select statements.', function() {
      const callback = {}; // Only checking the argument.  Normally this is a function.
      const params   = {};
      const query    = 'SELECT userID FROM users';
      qe.select(query, params, callback);

      expect(con.query.calls.argsFor(0)).toEqual([query, params, callback]);
    });
  });

  /**
   * Insert.
   */
  describe('.insert()', function() {
    it('uses pool.query() to execute insert statements.', function() {
      const callback = {};
      const params   = {};
      const query    = 'INSERT INTO users (userName) VALUES (:username)';
      qe.insert(query, params, callback);

      expect(con.query.calls.argsFor(0)).toEqual([query, params, callback]);
    });
  });

  /**
   * Delete.
   */
  describe('.delete()', function() {
    it('uses pool.query() to execute delete statements.', function() {
      const callback = {};
      const params   = {};
      const query    = 'DELETE FROM users WHERE userID = 1';
      qe.delete(query, params, callback);

      expect(con.query.calls.argsFor(0)).toEqual([query, params, callback]);
    });
  });

  /**
   * Update.
   */
  describe('.update()', function() {
    it('uses pool.query() to execute update statements.', function() {
      const callback = {};
      const params   = {};
      const query    = "UPDATE users SET firstName = 'Joe' WHERE userID = 2";
      qe.update(query, params, callback);

      expect(con.query.calls.argsFor(0)).toEqual([query, params, callback]);
    });
  });
});

