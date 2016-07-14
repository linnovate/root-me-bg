'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
  Schema    = mongoose.Schema,
  crypto    = require('crypto'),
  _   = require('lodash');



/**
 * Getter
 */
var escapeProperty = function(value) {
  return _.escape(value);
};

/**
 * User Schema
 */

var ImageToDateSchema = new Schema({
  date: {
    type: Date,
    required: true,
    get: escapeProperty
  },
  imageId: {
    type: String,
    required: true
  }
});

mongoose.model('ImageToDate', ImageToDateSchema);

