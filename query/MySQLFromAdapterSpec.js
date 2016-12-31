describe('MySQLFromAdapter()', function() {
  'use strict';

  const insulin          = require('insulin');
  const MySQLFromAdapter = insulin.get('ndm_MySQLFromAdapter');
  const MySQLEscaper     = insulin.get('ndm_MySQLEscaper');
  const db               = insulin.get('ndm_testDB');
  const escaper          = new MySQLEscaper();
  let   qryExec;

  beforeEach(() => qryExec = jasmine.createSpyObj('qryExec', ['select', 'delete']));

  /**
   * Ctor.
   */
  describe('.constructor()', function() {
    it('extends FromAdapter.', function() {
      const FromAdapter = insulin.get('ndm_FromAdapter');
      const fa          = new MySQLFromAdapter(db, escaper, qryExec, 'users u');

      expect(fa instanceof FromAdapter).toBe(true);
      expect(fa.database).toBe(db);
      expect(fa.queryExecuter).toBe(qryExec);
      expect(fa.escaper).toBe(escaper);
    });
  });

  /**
   * Select.
   */
  describe('.select().', function() {
    it('returns a MySQLSelect instance.', function() {
      const MySQLSelect = insulin.get('ndm_MySQLSelect');
      const sel         = new MySQLFromAdapter(db, escaper, qryExec, {table: 'users'})
        .select();

      expect(sel instanceof MySQLSelect).toBe(true);
    });

    it('selects all columns by default.', function() {
      const sel = new MySQLFromAdapter(db, escaper, qryExec, {table: 'users'})
        .select();

      expect(sel.toString()).toBe(
        'SELECT  `users`.`userID` AS `users.userID`,\n' +
        '        `users`.`firstName` AS `users.firstName`,\n' +
        '        `users`.`lastName` AS `users.lastName`\n' +
        'FROM    `users` AS `users`');
    });

    it('can be passed columns explicitly.', function() {
      const sel = new MySQLFromAdapter(db, escaper, qryExec, {table: 'users'})
        .select('users.userID', 'users.firstName');

      expect(sel.toString()).toBe(
        'SELECT  `users`.`userID` AS `users.userID`,\n' +
        '        `users`.`firstName` AS `users.firstName`\n' +
        'FROM    `users` AS `users`');
    });
  });

  /**
   * Delete.
   */
  xdescribe('.delete()', function() {
    it('returns a Delete instance.', function() {
      const Delete = insulin.get('ndm_Delete');
      const del    = new MySQLFromAdapter(db, escaper, qryExec, 'users')
        .where({$eq: {'users.userID': 1}})
        .delete();

      expect(del instanceof Delete).toBe(true);
    });

    it('can be provided an optional table alias.', function() {
      const del    = new MySQLFromAdapter(db, escaper, qryExec, 'users u')
        .where({$eq: {'u.userID': 1}})
        .delete();

      expect(del.toString()).toBe(
        'DELETE  `u`\n' +
        'FROM    `users` AS `u`\n' +
        'WHERE   `u`.`userID` = 1');
    });
  });

  /**
   * Update.
   */
  describe('.update()', function() {
    it('returns a MySQLUpdate instance.', function() {
      const MySQLUpdate = insulin.get('ndm_MySQLUpdate');
      const upd         = new MySQLFromAdapter(db, escaper, qryExec, 'users u')
        .update({'u.firstName': 'Joe'});

      expect(upd instanceof MySQLUpdate).toBe(true);
    });

    it('passes the model to the Update constructor.', function() {
      const upd = new MySQLFromAdapter(db, escaper, qryExec, 'users u')
        .where({$eq: {'u.userID': 1}})
        .update({'u.firstName': 'Joe'});

      expect(upd.toString()).toBe(
        'UPDATE  `users` AS `u`\n' +
        'SET\n' +
        '`u`.`firstName` = :u_firstName_0\n' +
        'WHERE   `u`.`userID` = 1');
    });
  });
});

