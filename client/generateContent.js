// Render header

var headerHtml = '';
for (var i = 0; i < roundCnt; i++) {
  headerHtml += '<div class="cell">Раунд ' + (i + 1) + '</div>';
}
headerHtml += '<div class="cell cellResult cellRank">Ранг</div>';
headerHtml += '<div class="cell cellResult cellRoundCnt">Кол. раундов</div>';
headerHtml += '<div class="cell cellResult cellSumm">Сумма</div>';
headerHtml += '<div class="cell cellResult cellAvg">Среднее</div>';
headerHtml += '<div class="cell cellResult cellPercent">%</div>';
header.innerHTML = headerHtml;


// Render sidebar

var sidebarHtml = '';

for (var i = 0; i < moreThanThreeRounds.length; i++) {
  sidebarHtml += '<div class="sidebarRow"><div class="sidebarRowIndex">' + ( i + 1 ) + '</div>' + moreThanThreeRounds[i].name + '</div>';
}

sidebarHtml += '<div class="hr"></div>';

for (var k = 0; k < lessThatFourRounds.length; k++, i++) {
  sidebarHtml += '<div class="sidebarRow"><div class="sidebarRowIndex">' + ( i + 1 ) + '</div>' + lessThatFourRounds[k].name + '</div>';
}

sidebar.innerHTML = sidebarHtml;


// Render content

var contentHtml = '';

function generateContent(teams) {
  for (var y = 0; y < teams.length; y++) {
    contentHtml += '<div class="contentRow">';

    for (var x = 0; x < roundCnt; x++) {
      var value = teams[y].rounds[x] || '';

      contentHtml += '<div class="cell">' + value + '</div>';
    }

    contentHtml += '<div class="cell cellResult cellRank">' + teams[y].rank + '</div>';
    contentHtml += '<div class="cell cellResult cellRoundCnt">' + teams[y].roundCnt + '</div>';
    contentHtml += '<div class="cell cellResult cellSumm">' + teams[y].statSum + '</div>';
    contentHtml += '<div class="cell cellResult cellAvg">' + teams[y].statAvg + '</div>';
    contentHtml += '<div class="cell cellResult cellPercent">' + teams[y].percent + '</div>';

    contentHtml += '</div>';
  }
}

generateContent(moreThanThreeRounds);

contentHtml += '<div class="hr"></div>';

generateContent(lessThatFourRounds);

content.innerHTML = contentHtml;
