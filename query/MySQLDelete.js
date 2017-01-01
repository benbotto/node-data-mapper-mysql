'use strict';

require('insulin').factory('ndm_MySQLDelete',
  ['ndm_Delete'], ndm_MySQLDeleteProducer);

function ndm_MySQLDeleteProducer(Delete) {
  /**
   * A representation of a MySQL DELETE query.
   * @extends Delete
   */
  class MySQLDelete extends Delete {
    /**
     * Build the query.
     * @return {Query~QueryMeta} The string-representation of the query to
     * execute along with query parameters.
     */
    buildQuery() {
      const fromAlias = this.escaper.escapeProperty(this._delTableMeta.as);
      const from      = this._from.toString();

      return {
        sql:    `DELETE  ${fromAlias}\n${from}`,
        params: this._from.paramList.params
      };
    }
  }

  return MySQLDelete;
}

