// Render header

var headerHtml = '';
for (var i = 0; i < data.roundCnt; i++) {
  headerHtml += '<div class="cell">Игра ' + (i + 1) + '</div>';
}
headerHtml += '<div class="cell cellResult cellRank">Ранг</div>';
headerHtml += '<div class="cell cellResult cellRoundCnt">Кол. игр</div>';
headerHtml += '<div class="cell cellResult cellSumm">Сумма</div>';
headerHtml += '<div class="cell cellResult cellAvg">Среднее</div>';
headerHtml += '<div class="cell cellResult cellPercent">%</div>';
header.innerHTML = headerHtml;


// Render sidebar

var sidebarHtml = '';
var sidebarIterationIndex = 0;
var sidebarItemIndex = 0;

function generateSidebar(group) {
  for (var i = 0; i < group.length; i++, sidebarIterationIndex++, sidebarItemIndex++) {
    sidebarHtml += '<div index="' + sidebarItemIndex + '" class="sidebarRow"><div class="sidebarRowIndex">' + ( sidebarIterationIndex + 1 ) + '</div>' + group[i].name + '</div>';
  }
}

generateSidebar(data.firstGroup);

sidebarItemIndex++;
sidebarHtml += '<div class="hr"></div>';

generateSidebar(data.secondGroup);

sidebar.innerHTML = sidebarHtml;


// Render content

var contentHtml = '';
var contentIndex = 0;

function generateContent(teams) {
  for (var y = 0; y < teams.length; y++, contentIndex++) {
    contentHtml += '<div index="' + contentIndex + '" class="contentRow">';

    for (var x = 0; x < data.roundCnt; x++) {
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

generateContent(data.firstGroup);

contentIndex++;
contentHtml += '<div class="hr"></div>';

generateContent(data.secondGroup);

content.innerHTML = contentHtml;
