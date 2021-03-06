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

exports.getTotals = function() {
  return new Promise((resolve, reject) => {

    // let totalScore = assignments.reduce((score, after) => prev + after);
    // let grandTotal = assignments.reduce((total, next) => total + next);
    // let gradeTotal = assignments.for key in something .....

    let sql = squel.select()
    .from('assignments')
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

    // let grade;
    //
    // let percentage = (score / total);
    //
    //   if(percentage >= .9){
    //     grade =  'A';
    //   } else if(percentage < .9 && percentage >= .8){
    //     grade =  'B';
    //   } else if(percentage < .8 && percentage >= .7){
    //     grade =  'C';
    //   } else if(percentage < .7 && percentage >= .6){
    //     grade =  'D';
    //   } else if(percentage < .6){
    //     grade =  'F';
    //   } else {
    //     console.log('bad data');
    //   }

    let sql = squel.insert()
    .into('assignments')
    .setFields(newAssignment)
    .set('id', uuid())
    // .set('grade', grade)
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

exports.update = function(id, updateObj) {
  return new Promise((resolve, reject) => {
    delete updateObj.id;
    
    let sql = squel.update()
    .table('assignments')
    .setFields(updateObj)
    .where('id = ?', id)
    .toString();

    connection.query(sql, (err, okObject) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
