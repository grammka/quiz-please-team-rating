var fullData = require('./generate/full_data');


var firstGroupGamesPlayedCnt = 5;
var teams     = fullData.teams;
var gamesCnt  = fullData.gamesCnt;


// Slice team on [ playedGamesCnt > firstGroupGamesPlayedCnt ] and [ firstGroupGamesPlayedCnt < playedGamesCnt ]

teams = teams.sort(function(a, b) {
	return b.playedGamesCnt - a.playedGamesCnt;
});

var firstGroup = teams.filter(function(team) {
	return team.playedGamesCnt >= firstGroupGamesPlayedCnt;
});

var secondGroup = teams.slice(firstGroup.length);


// Sort by winPercent

firstGroup = firstGroup.sort(function(a, b) {
	return b.winPercent - a.winPercent;
});

secondGroup = secondGroup.sort(function(a, b) {
  return b.winPercent - a.winPercent;
});


module.exports = {
  gamesCnt: gamesCnt,
  firstGroup: firstGroup,
  secondGroup: secondGroup
};
