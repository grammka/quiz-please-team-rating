var fs          = require('fs');
var path        = require('path');
var gameNum     = process.argv[2];


if (gameNum) {
  transform(path.join(__dirname, '../storage/games/game_' + gameNum), gameNum);
} else {
  var filesCnt = fs.readdirSync(path.join(__dirname, '../storage/games'), function(err) {
    if (err) {
      return console.log(err);
    }
  }).length;

  var files = Array.apply(null, {length: filesCnt}).map(Number.call, Number);

  files.forEach((file, index) => {
    var gameNum   = index + 1;
    var filePath  = path.join(__dirname, '../storage/games/game_' + gameNum + '.js');

    transform(filePath, gameNum);
  });
}


function transform(file, gameNum) {
  var teams         = require(file);
  var totalPoints   = [];

  var result = {
    minPoints: null,
    maxPoints: null,
    difficultyRate: null,
    teams: {}
  };

  teams.forEach((teamData) => {
    var teamName          = teamData[1];
    var teamTotalPoints   = teamData[teamData.length - 1] || 0;
    var roundsExist       = teamData.length > 3;
    var rounds            = [];

    if (teamTotalPoints) {
      teamTotalPoints = Number(teamTotalPoints.replace(',', '.'));
    }

    if (roundsExist) {
      rounds = teamData.slice(2).slice(0, -1);
      rounds = rounds.map((points) => points && typeof points == 'string' && Number(points.replace(',', '.')) || points);
    }

    var team = {
      name: teamName,
      totalPoints: teamTotalPoints,
      winPercent: null,
      rounds: rounds
    };

    result.teams[teamName] = team;

    totalPoints.push(teamTotalPoints);
  });

  result.minPoints        = Math.min.apply(Math, totalPoints);
  result.maxPoints        = Math.max.apply(Math, totalPoints);
  result.difficultyRate   = Number((64 / result.maxPoints).toFixed(3));

  for (var teamName in result.teams) {
    var team = result.teams[teamName];
    
    team.winPercent = Number((team.totalPoints / result.maxPoints * 100).toFixed(2));
  }


  var code = 'module.exports = ' + JSON.stringify(result, null, 2) + ';\n';
  
  fs.writeFile(path.resolve(__dirname, '../storage/transformed_games/game_' + gameNum + '.js'), code, function(err) {
    if (err) {
      return console.log(err);
    }
  
    console.log('Game ' + gameNum + ' data transformed successfully!');
  });
}
