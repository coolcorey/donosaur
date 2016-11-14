var MongoClient = require('mongodb').MongoClient;
var fs = require('fs')
var async = require('async');
var https = require('https');

var dburl = "mongodb://localhost:27017/donosaur";
var apiurl = "https://app.place2give.com/Service.svc";
var app_id = "19943be1-d80a-4258-9f31-138b446313cc";
var app_secret = "4ac60bb3-2c7f-4238-84c1-a0939f7bd56c";
var token = "";
var lastBeforeClose = "382699957";

//https://app.place2give.com/Service.svc/give-api-auth?app_id=19943be1-d80a-4258-9f31-138b446313cc&app_secret=4ac60bb3-2c7f-4238-84c1-a0939f7bd56c&format=json
//https://app.place2give.com/Service.svc/give-api?action=getCharityDetails&token=fb193c4a-79cd-4355-84ed-8f06c8be2d20&format=json&regNum=256068908

var callAPI = function(url, cb){
  https.get(url, (res) => {
    var str = '';

    res.on('data', (chunk) => {
      str += chunk;
    });

    res.on('end', function(){
      var result = JSON.parse(str);
      cb(result)
      return;
    })

  }).on('error', (e) => {
    console.error(e);
    cb(null);
  })
}

callAPI(apiurl + '/give-api-auth?app_id=' + app_id + '&app_secret=' + app_secret + '&format=json', function(result){
  token = result['give-api'].data.token;
  console.log(token);
  MongoClient.connect(dburl, function(err, db) {
    if(err){
      console.log(err);
      return;
    }
    console.log("Connected correctly to server");
    var collection = db.collection('meta');

    collection.find({INCOME_AMT: {$ne: 0}}, {EIN:1}).toArray(function(err, docs) {
      console.log(docs.length);
      if(lastBeforeClose){
        for(var i=0;i<docs.length;i++){
          if(docs[i].EIN == lastBeforeClose){
            docs.splice(0, i);
            break;
          }
        }
        console.log('unfinished', docs.length);
        //return;
      }
      async.eachSeries(docs, function(doc, cb){
        console.log(doc.EIN);

        callAPI(apiurl + '/give-api?action=getCharityDetails&token=' + token + '&format=json&regNum=' + doc.EIN, function(result){
          if(!result || !result['give-api'].data){
            console.log('ERROR', doc.EIN);
            fs.appendFile('errors.txt', JSON.stringify(doc.EIN) + '\n', function(err){
              if(err){
                console.log(err);
              }
              setImmediate(cb);
            });
          }else{
            result['give-api'].data.EIN = doc.EIN;
            fs.appendFile('mined.txt', JSON.stringify(result['give-api'].data) + '\n', function(err){
              if(err){
                console.log(err);
              }
              setImmediate(cb);
            });
          }
        })

      }, function(){
        console.log('done');
        db.close();
      })

    })
  })
})





/*
MongoClient.connect(url, function(err, db) {
  if(err){
    console.log(err);
    return;
  }
  console.log("Connected correctly to server");
  var collection = db.collection('meta');



  collection.find({INCOME_AMT: {$ne: 0}}, {EIN:1}).toArray(function(err, docs) {
    console.log(docs.length);


    fs.appendFile('nonzero.txt', JSON.stringify(docs), function(err){
      if(err){
        console.log(err);
      }
      db.close();
      console.log('done');
    });


    async.eachSeries(docs, function(doc, cb){
      console.log(doc.EIN);
      setTimeout(function(){
        setImmediate(cb);
      }, 500)

    }, function(){
      console.log('done');
    })

  });
})
*/
