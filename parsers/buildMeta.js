
var MongoClient = require('mongodb').MongoClient;

fs = require('fs');
async = require('async');

//--max_old_space_size=4096
//use donosaur
//db.meta.createIndex({NAME: 'text'})
//db.meta.createIndex({ASSET_AMT:1})
//db.meta.createIndex({REVENUE_AMT:1})
//db.meta.createIndex({ZIP:1})
//db.meta.createIndex({CITY:1})
var labels = [
  'EIN',
  'NAME',
  'ICO',
  'STREET',
  'CITY',
  'STATE',
  'ZIP',
  'GROUP',
  'SUBSECTION',
  'AFFILIATION',
  'CLASSIFICATION',
  'RULING',
  'DEDUCTIBILITY',
  'FOUNDATION',
  'ACTIVITY',
  'ORGANIZATION',
  'STATUS',
  'TAX_PERIOD',
  'ASSET_CD',
  'INCOME_CD',
  'FILING_REQ_CD',
  'PF_FILING_REQ_CD',
  'ACCT_PD',
  'ASSET_AMT',
  'INCOME_AMT',
  'REVENUE_AMT',
  'NTEE_CD',
  'SORT_NAME'
]

var integers = ['ASSET_AMT', 'INCOME_AMT', 'REVENUE_AMT'];
var results = [];

var url = 'mongodb://localhost:27017/donosaur';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if(err){
    console.log(err);
    return;
  }
  console.log("Connected correctly to server");
  var collection = db.collection('meta');

/*
  console.time('search');

  collection.find( { $text : {$search : "metropolitan center independent"}  } ,
                {score : { $meta: "textScore" } }).sort( { score: { $meta: "textScore" } } ).limit(10).toArray(function(err, docs) {
                 console.log("Found " +  docs.length + " the following records");
                 console.timeEnd('search');
                 console.log(docs);

                 db.close();
               });
*/
            /*
  collection.find({$text:{$search:"metropolitan center for"}}).toArray(function(err, docs) {
   console.log("Found " +  docs.length + " the following records");
   //console.log(docs);
   console.timeEnd('search');
   db.close();
 });
*/



  async.eachSeries([
    //'eo1.csv',
    'eo2.csv',
    //'eo3.csv',
    //'eo4.csv'
  ], function(file, cb){
    fs.readFile(file, 'utf8', function(err, data){
      var lines = data.split('\n');
      lines.splice(0, 1);
      var docs = [];
      for(var i=0;i<lines.length;i++){
        var cells = lines[i].split(',');
        if(!lines[i])continue;
        var doc = {};
        for(var j=0;j<cells.length;j++){
          var val = cells[j].trim();
          var key = labels[j];

          if(integers.indexOf(key) != -1){
            val = parseInt(val);
            if(isNaN(val)){
              val = 0;
            }
          }

          doc[labels[j]] = val;
        }

        try{
          doc.ZIP = doc.ZIP.split('-')[0];
        }catch(e){
            console.log(doc, lines[i]);
        }

        //console.log(doc);

        docs.push(doc);
      }
console.log(docs.length);

      // Insert some documents
      collection.insertMany(docs, function(err, result) {
        console.log("Inserted " + result.ops.length + " documents into the document collection");
        cb(null, 'ok');
      });

    })
  }, function(){
    console.log('done');
    db.close();
  })

});




/*
fs = require('fs');
async = require('async');
var names = [];
var searchmeta = [];
var norch = {};


async.eachSeries(['eo1.csv','eo2.csv','eo3.csv','eo4.csv'], function(file, cb){
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var lines = data.split('\n');
    for(var i=1;i<lines.length;i++){
      var cells = lines[i].split(',');
      if(cells[1] == null || cells[0] == null){
        console.log('NULL Name or Ein', lines[i]);
      }else{
        names.push(cells[1]);
        //console.log(cells[26]);
        norch[cells[0]] = {
          name:cells[1],
          ein:cells[0],
          zip:cells[6],
          //city:cells[4],
          //state:cells[5],
          //incomeamt:cells[24],
          //assetamt:cells[23],
          //revenueamt:cells[25],
          //ntee:cells[26]
        }

        if(cells[26]){
          var ntee = cells[26];
        }else{
          var ntee = '';
        }
        var obj = {name:cells[1], ein:cells[0], zip:cells[6], city:cells[4], state:cells[5], incomeamt:cells[24], assetamt:cells[23], revenueamt:cells[25]};
        searchmeta.push(obj);
      }
    }

    cb(null, 'ok');
  });
}, function(){
    //console.log('done', inds.length);
    fs.writeFile('names.json', JSON.stringify(names), function (err) {
      if (err) return console.log(err);
      //console.log('NAMES > names.json');
    });

    fs.writeFile('searchmeta.json', JSON.stringify(searchmeta), function (err) {
      if (err) return console.log(err);
      //console.log('SearchMet > searchmeta.json');
    });


    fs.writeFile('norchmeta.json', JSON.stringify(norch), function (err) {
      if (err) return console.log(err);
      console.log('NorchMeta > norchmeta.json');
    });

    //console.log(JSON.stringify(inds));
});
*/
