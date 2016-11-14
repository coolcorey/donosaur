var numMissions = 0;
var totalLines = 0;

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('mined.txt')
});

lineReader.on('line', function (line) {
  totalLines++;
  var mined = JSON.parse(line);
  if(mined.MissionStatement){
    numMissions++;
    console.log(numMissions + "/" + totalLines);
    //console.log(mined.MissionStatement);
  }
  //console.log(mined);
});
