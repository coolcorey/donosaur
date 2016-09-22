
var MongoClient = require('mongodb').MongoClient;

fs = require('fs');
csv = require("fast-csv");

//--max_old_space_size=4096
//use donosaur
//db.tax2015.createIndex({EIN:1})

var year = "12";

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function formatNumbers(data){
  for(elem in data){
    if(elem == 'EIN' || !isNumber(data[elem])){
      continue;
    }
    data[elem] = parseInt(data[elem]);
  }
  return data;
}

var count = 0;

var do990 = function(collection, db){
  var allData = [];
  var type = "990";
  var filepath = "../../data/py" + year + "_" + type + ".dat";
  var stream = fs.createReadStream(filepath);
  var csvStream = csv({trim:true, ignoreEmpty:true, headers:true, delimiter:' '})
      .on("data", function(data){
            count++;
            data = formatNumbers(data);
            data.type = type;
            allData.push(data);

            if(count%1000 == 0){
              csvStream.pause();
              collection.insertMany(allData, function(err, result) {
                if(err){
                  console.log(err);
                }
                allData = [];
                csvStream.resume();
              });
            }
      })
      .on("end", function(){
           console.log(type,count);
           collection.insertMany(allData, function(err, result) {
             allData = [];
             do990EZ(collection, db);
           });
      });

  stream.pipe(csvStream);

}

var do990EZ = function(collection, db){
  var allData = [];
  var type = "990EZ";
  var filepath = "../../data/py" + year + "_" + type + ".dat";
  var stream = fs.createReadStream(filepath);
  var csvStream = csv({trim:true, ignoreEmpty:true, headers:true, delimiter:' '})
      .on("data", function(data){
            count++;
            data = formatNumbers(data);
            data.type = type;
            allData.push(data);
            if(count%1000 == 0){
              csvStream.pause();
              collection.insertMany(allData, function(err, result) {
                allData = [];
                csvStream.resume();
              });
            }
      })
      .on("end", function(){
           console.log(type,count);
           collection.insertMany(allData, function(err, result) {
             if(err){
               console.log(err);
             }
             allData = [];
             do990PF(collection, db);
           });
      });

  stream.pipe(csvStream);
  /*
  count = 0;
  var allData = [];
  var stream = fs.createReadStream("990EZ/20" + year + "/py" + year + "_990ez.dat");
  stream.pipe(csv({trim:true, ignoreEmpty:true, headers:true, delimiter:' '})
  .on("data", function(data){
    count++;

    for(elem in data){
      if(elem == 'EIN' || !isNumber(data[elem])){
        continue;
      }
      data[elem] = parseInt(data[elem]);
    }
    data.type = '990EZ';
    allData.push(data);

    if(count%500 == 0 && !stream.isPaused()){
      stream.pause();
      //console.log('Paused', count);
      setTimeout(function(){
        console.log('Resume', count);
        collection.insertMany(allData, function(err, result) {
          //console.log("Inserted " + result.ops.length + " documents into the document collection");
          allData = [];
          stream.resume();
        });

      }, 500)
    }

  })
  .on("end", function(){
    console.log('990EZ',count);
    do990PF(collection, db);
  }))
  */
}

var do990PF = function(collection, db){
  var allData = [];
  var type = "990PF";
  var filepath = "../../data/py" + year + "_" + type + ".dat";
  var stream = fs.createReadStream(filepath);
  var csvStream = csv({trim:true, ignoreEmpty:true, headers:true, delimiter:' '})
      .on("data", function(data){
            count++;
            data = formatNumbers(data);
            data.type = type;
            allData.push(data);
            if(count%1000 == 0){
              csvStream.pause();
              collection.insertMany(allData, function(err, result) {
                if(err){
                  console.log(err);
                }
                allData = [];
                csvStream.resume();
              });
            }
      })
      .on("end", function(){
           console.log(type,count);
           collection.insertMany(allData, function(err, result) {
             allData = [];
             db.close();
           });
      });

  stream.pipe(csvStream);
  /*
  count = 0;
  var allData = [];
  var stream = fs.createReadStream("990PF/20" + year + "/py" + year + "_990pf.dat");
  stream.pipe(csv({trim:true, ignoreEmpty:true, headers:true, delimiter:' '})
  .on("data", function(data){
    count++;
    for(elem in data){
      if(elem == 'EIN' || !isNumber(data[elem])){
        continue;
      }
      data[elem] = parseInt(data[elem]);
    }
    data.type = '990PF';
    allData.push(data);

    if(count%500 == 0 && !stream.isPaused()){
      stream.pause();
      //console.log('Paused', count);
      setTimeout(function(){
        console.log('Resume', count);
        collection.insertMany(allData, function(err, result) {
          //console.log("Inserted " + result.ops.length + " documents into the document collection");
          allData = [];
          stream.resume();
        });

      }, 500)
    }

  })
  .on("end", function(){
    console.log('990PF',count);
    db.close();
  }))
  */
}

var url = 'mongodb://localhost:27017/donosaur';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if(err){
    console.log(err);
    return;
  }
  console.log("Connected correctly to server");
  var collection = db.collection('tax20' + year);
  do990(collection, db);

})
