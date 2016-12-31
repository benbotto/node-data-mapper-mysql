'use strict';

require('insulin').factory('ndm_MySQLUpdateModel',
  ['ndm_UpdateModel', 'ndm_MySQLUpdate'], ndm_MySQLUpdateModelProducer);

function ndm_MySQLUpdateModelProducer(UpdateModel, MySQLUpdate) {
  /**
   * A Query class specialized for updating models by ID.
   * @extends UpdateModel
   */
  class MySQLUpdateModel extends UpdateModel {
    /**
     * Create a MySQLUpdate instance.
     * @param {ModelTraverse~ModelMeta} meta - A meta object as created by the
     * modelTraverse class.
     * @return {MySQLUpdate} A MySQLUpdate Query instance representing the
     * query.
     */
    createQuery(meta) {
      const upd = super.createQuery(meta);

      return new MySQLUpdate(upd._from, upd._model);
    }
  }

  return MySQLUpdateModel;
}

