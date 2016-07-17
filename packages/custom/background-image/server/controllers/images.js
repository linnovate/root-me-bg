'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  ImageToDate = mongoose.model('ImageToDate'),
  Images = mongoose.model('Images'),
  async = require('async'),
  config = require('meanio').loadConfig(),
  crypto = require('crypto'),
  templates = require('lodash'),
  jwt = require('jsonwebtoken'); 


module.exports = function() {
    return {  
        byMonth: function(req, res, next) {
          var month = req.body;
          ImageToDate.find( //query today up to tonight
            {"date": {"$gte": new Date(2016, month.month, 1), "$lt": new Date(2016, month.month + 1, 1)}}, function(err, obj) {
              if(err) {
                return res.send('err', err);
              }
              console.log('ids', obj.map(function(o){ return mongoose.Types.ObjectId(o.imageId)}));
              Images.find({_id : {
                $in: obj.map(function(o){ return mongoose.Types.ObjectId(o.imageId)})
              }}, function(err, obj) {
                 if(err) {
                  return res.send('err', err);
                 }
                 console.log('success', obj);
                return res.send(obj);
              });
              
            })
        }, 
        create: function(req, res, next) {
            var data = req.body;
            data.date = new Date(data.date).setHours(0,0,0,0);
            var image = new Images({src: data.src, createdAt: new Date(), forDate: data.date})
            image.save(function(error, success) {
            ImageToDate.findOneAndUpdate({date: data.date}, {$set:{imageId:success._id}}, function(err, doc){
                  if(err){
                      console.log("Something wrong when updating data!");
                  }

                  if(!doc) {
                    console.log('doc');
                    var imageToDate = new ImageToDate({date: data.date, imageId: success._id});
                      imageToDate.save(function(err, success) {
                         if(err) {
                          return res.send('err');
                         }
                         Images.find({}, function(err, obj) {
                          console.log('obj', obj);
                         })
                      });
                  }
            });
            
            })          
           },
        getImage: function(req, res, next) {
          ImageToDate.findOne({date: new Date().setHours(0,0,0,0)}, function(err,obj) { 
            if(!err){
                Images.findOne({_id: obj.imageId}, function(err, obj) {
                  res.send(obj);
                })
                
          } });
        }
              
    };
}


