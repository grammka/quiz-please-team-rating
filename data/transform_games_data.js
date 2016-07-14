var fs          = require('fs');
var path        = require('path');
var gameNum     = process.argv[2];


if (gameNum) {
  transform('./games_data/game_' + gameNum, gameNum);
} else {
  fs.readdir(path.resolve(__dirname, 'games_data'), function(err, files) {
    for (var i = 0; i < files.length; i++) {
      transform('./games_data/' + files[i], i + 1);
    }
  })
}


function transform(file, gameNum) {
  var gameData   = require(file);
  var transformed = {};

  for (var y = 0; y < gameData.length; y++) {
    var row       = gameData[y];
    var teamName  = row[1];
    var total     = row[row.length - 1] || 0;

    if (total) {
      total = total.replace(',', '.');
    }

    transformed[teamName] = Number(total);
  }


  var code = 'module.exports = ' + JSON.stringify(transformed, null, 2) + ';\n';

  fs.writeFile(path.resolve(__dirname, 'transformed_games_data/game_' + gameNum + '.js'), code, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log('Game ' + gameNum + ' data transformed successfully!');
  });
}
