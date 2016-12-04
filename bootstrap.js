'use strict';

/**
 * This script sets up the dependency injection container, insulin.
 */
const insulin = require('insulin');

// Static dependencies.
insulin
  .factory('mysql', () => require('mysql'));

// Registers itself with insulin under the ndm namespace.
require('node-data-mapper');
require('ndm-schema-generator-mysql');

// Application (dynamic) dependencies.
const glob = require('glob');
const opts = {
  cwd: __dirname,
  ignore: [
    './node_modules/**',
    './example/**',
    './doc/**',
    './grunt/**',
    './Gruntfile.js',
    './**/*Spec.js',
    './bootstrap.js',
    './index.js'
  ]
};

const files = glob.sync('./**/*.js', opts);

// Let each file register itself with the DiC.
files.forEach(require);

// Export the list of files.
module.exports = files;

