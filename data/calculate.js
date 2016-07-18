var fullData = require('./generate/full_data');


var firstGroupGamesPlayedCnt = 5;
var teams     = fullData.teams;
var gamesCnt  = fullData.gamesCnt;


// Slice team on [ playedGamesCnt > firstGroupGamesPlayedCnt ] and [ firstGroupGamesPlayedCnt < playedGamesCnt ]

teams = teams.sort((a, b) => {
	return b.playedGamesCnt - a.playedGamesCnt;
});

var firstGroup = teams.filter((team) => {
	return team.playedGamesCnt >= firstGroupGamesPlayedCnt;
});

var secondGroup = teams.slice(firstGroup.length);


// Sort by winPercent

firstGroup = firstGroup.sort((a, b) => {
	return b.winPercent - a.winPercent;
});

secondGroup = secondGroup.sort((a, b) => {
  return b.winPercent - a.winPercent;
});

secondGroup[0].nextGroupStarts = true;

teams = firstGroup.concat(secondGroup)

var uniqueTeamNames = teams.map((item) => item.name);


module.exports = {
  gamesCnt,
  teams,
  teamNames: uniqueTeamNames
};
