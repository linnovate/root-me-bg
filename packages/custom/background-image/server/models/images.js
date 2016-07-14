'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
  Schema    = mongoose.Schema,
  crypto    = require('crypto'),
  _   = require('lodash');




var Images = new Schema({
  src: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  forDate: {
  	type: Date,
    required: true
  }
});

mongoose.model('Images', Images);