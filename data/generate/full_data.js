var fs    = require('fs');
var path  = require('path');


var filesCnt = fs.readdirSync(path.join(__dirname, '../storage/transformed_games'), function(err) {
  if (err) {
    return console.log(err);
  }
}).length;

var files = Array.apply(null, {length: filesCnt}).map(Number.call, Number);

var games = files.map((file, index) => require(path.join(__dirname, '../storage/transformed_games/game_' + (index + 1) + '.js')));

var uniqueTeamNames = Array.from(new Set([].concat.apply([], games.map((game) => Object.keys(game.teams)))));

var teams = {};

uniqueTeamNames.forEach((teamName) => {
  var teamData = {
    name: teamName,
    games: [],
    playedGamesCnt: null,
    sumPoints: null,
    avgPoints: null,
    winPercent: null
  };

  var winPercents = [];

  games.forEach((game) => {
    var teamDataInGame = game.teams[teamName];

    if (teamDataInGame) {
      teamData.games.push(teamDataInGame.totalPoints);
      winPercents.push(teamDataInGame.winPercent);
    } else {
      teamData.games.push('-');
    }
  });

  teamData.playedGamesCnt   = teamData.games.filter((points) => points != '-').length;
  teamData.sumPoints        = teamData.games.reduce((sum, points) => sum + (points == '-' ? 0 : points), 0);
  teamData.avgPoints        = teamData.sumPoints / teamData.playedGamesCnt;
  teamData.avgPoints        = Number(teamData.avgPoints.toFixed(2));
  teamData.winPercent       = winPercents.reduce((sum, points) => sum + (points == '-' ? 0 : points), 0) / teamData.playedGamesCnt;
  teamData.winPercent       = Number(teamData.winPercent.toFixed(2));

  teams[teamName] = teamData;
});

var gamesCnt  = games.length;
teams         = uniqueTeamNames.map((teamName) => teams[teamName]);


module.exports = {
  gamesCnt: gamesCnt,
  teams: teams
};
