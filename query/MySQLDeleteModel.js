'use strict';

require('insulin').factory('ndm_MySQLDeleteModel',
  ['ndm_MySQLDelete', 'ndm_DeleteModel'], ndm_MySQLDeleteModelProducer);

function ndm_MySQLDeleteModelProducer(MySQLDelete, DeleteModel) {
  /**
   * A Query class that allows for quickly deleting of models by ID.
   * @extends DeleteModel
   */
  class MySQLDeleteModel extends DeleteModel {
    /**
     * Create a MySQLDelete instance.
     * @param {ModelTraverse~ModelMeta} meta - A meta object as created by the
     * modelTraverse class.
     * @return {MySQLDelete} A MySQLDelete Query instance representing the DELETE query.
     */
    createQuery(meta) {
      const del = super.createQuery(meta);
      return new MySQLDelete(del._from);
    }
  }

  return MySQLDeleteModel;
}

