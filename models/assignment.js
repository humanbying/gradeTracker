const squel = require('squel').useFlavour('mysql');
const uuid = require('uuid');
const moment = require('moment');
const db = require('../config/db');

db.query(`create table if not exists assignments (
    id varchar(50),
    name varchar(100),
    total smallint,
    score smallint,
    grade varchar(5)
  )`, err => {
    if(err) {
      console.log('TABLE CREATE ERROR:', err);
    }
  });

  exports.getAll = function() {
    return new Promise((resolve, reject) => {
      let sql = squel.select()
                     .from('assignments')
                     .toString();

      db.query(sql, (err, assignments) => {
        if(err){
          reject(err);
        } else {
          resolve(assignments);
        }
      });
    });
  };

  exports.getOne = function(id){
    return new Promise((resolve, reject) => {
      let sql = squel.select()
                     .from('assignments')
                     .where('id = ?',id)
                     .toString();

      db.query(sql, (err, orders) => {
      let assignment = assignments[0];
        if(err){
          reject(err);
        } else {
          resolve(assignment);
        }
      });
    });
  };

  exports.create = function(newAssignment){
  return new Promise((resolve, reject) => {

    let sql = squel.insert()
                   .into('assignments')
                   .setFields(newAssignment)
                   .set('id', uuid())
                   .toString();

    db.query(sql, err => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


exports.delete = function(id){
  return new Promise((resolve, reject) => {
    let sql = squel.delete()
                   .from('assignments')
                   .where('id = ?',id)
                   .toString();

    db.query(sql, err => {
      if(err){
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
