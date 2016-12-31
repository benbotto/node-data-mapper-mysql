  describe('MySQLUpdateModel()', function() {
  'use strict';

  const insulin          = require('insulin');
  const MySQLUpdateModel = insulin.get('ndm_MySQLUpdateModel');
  const MySQLEscaper     = insulin.get('ndm_MySQLEscaper');
  const db               = insulin.get('ndm_testDB');
  const escaper          = new MySQLEscaper();
  let qryExec;

  beforeEach(() => qryExec = jasmine.createSpyObj('qryExec', ['update']));

  /**
   * Create query.
   */
  describe('.createQuery()', function() {
    it('returns valid SQL and parameters.', function() {
      const upd = new MySQLUpdateModel(db, escaper, qryExec, {
        users: {
          ID:    1,
          first: 'Joe',
          last:  'Smith'
        }
      });

      qryExec.update.and.callFake(function(query, params) {
        expect(query).toBe(
          'UPDATE  `users` AS `users`\n' +
          'SET\n' +
          '`users`.`firstName` = :users_firstName_1,\n' +
          '`users`.`lastName` = :users_lastName_2\n' +
          'WHERE   (`users`.`userID` = :users_userID_0)'
        );

        expect(params).toEqual({
          users_userID_0:    1,
          users_firstName_1: 'Joe',
          users_lastName_2:  'Smith'
        });
      });

      upd.execute();
    });
  });
});

