'use strict';

require('insulin').factory('ndm_MySQLFromAdapter',
  ['ndm_FromAdapter', 'ndm_MySQLSelect', 'ndm_MySQLUpdate', 'ndm_MySQLDelete'],
  ndm_MySQLFromAdapterProducer);

function ndm_MySQLFromAdapterProducer(FromAdapter, MySQLSelect, MySQLUpdate, MySQLDelete) {
  /**
   * An specialization of the FromAdapter class for MySQL.
   * @extends FromAdapter
   */
  class MySQLFromAdapter extends FromAdapter {
    /**
     * Select from the table.
     * @see Select#select
     * @param {...(object|string)} [cols] - An optional set of columns to select.
     * @return {MySQLSelect} A MySQLSelect instance that can be executed.
     */
    select(...cols) {
      const sel = new MySQLSelect(this, this._queryExecuter);

      // This has to be applied because cols is optional.  If cols is not passed,
      // calling sel.select(cols) would pass undefined to select().
      return sel.select.apply(sel, cols);
    }

    /**
     * Delete from the table.
     * @param {string} [tableAlias] - The unique alias of the table from which
     * records will be deleted.  Optional, defaults to the alias of the from
     * table.
     * @return {MySQLDelete} A MySQLDelete instance that can be executed.
     */
    delete(tableAlias) {
      return new MySQLDelete(this, tableAlias);
    }

    /**
     * Update a table.
     * @param {Object} model - The model describing what to update.
     * @see Update
     * @return {MySQLUpdate} A MySQLUpdate instance that can be executed.
     */
    update(model) {
      return new MySQLUpdate(this, model);
    }
  }

  return MySQLFromAdapter;
}

