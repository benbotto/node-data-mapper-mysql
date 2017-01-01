describe('MySQLDeleteModel()', function() {
  'use strict';

  const insulin          = require('insulin');
  const MySQLDeleteModel = insulin.get('ndm_MySQLDeleteModel');
  const MySQLEscaper     = insulin.get('ndm_MySQLEscaper');
  const db               = insulin.get('ndm_testDB');
  const escaper          = new MySQLEscaper();
  let qryExec;

  beforeEach(() => qryExec = jasmine.createSpyObj('qryExec', ['delete']));

  /**
   * Create query.
   */
  describe('.createQuery()', function() {
    it('generates the correct sql and parameters for a single model.', function() {
      const del = new MySQLDeleteModel(db, escaper, qryExec, {users: {ID: 1}});

      qryExec.delete.and.callFake(function(query, params) {
        expect(query).toBe(
          'DELETE  `users`\n' +
          'FROM    `users` AS `users`\n' +
          'WHERE   (`users`.`userID` = :users_userID_0)'
        );

        expect(params).toEqual({
          users_userID_0: 1
        });
      });

      del.execute();
      expect(qryExec.delete).toHaveBeenCalled();
    });

    it('generates the correct sql and parameters for multiple models.', function() {
      const users = {users: [{ID: 1}, {ID: 3}]};
      const del   = new MySQLDeleteModel(db, escaper, qryExec, users);

      qryExec.delete.and.callFake((q, p, cb) => cb(null, {rowsAffected: 1}));

      del.execute();

      expect(qryExec.delete.calls.count()).toBe(2);

      for (let i = 0; i < 2; ++i) {
        expect(qryExec.delete.calls.argsFor(i)[0]).toBe(
          'DELETE  `users`\n' +
          'FROM    `users` AS `users`\n' +
          'WHERE   (`users`.`userID` = :users_userID_0)'
        );
      }

      expect(qryExec.delete.calls.argsFor(0)[1]).toEqual({users_userID_0: 1});
      expect(qryExec.delete.calls.argsFor(1)[1]).toEqual({users_userID_0: 3});
    });
  });
});

