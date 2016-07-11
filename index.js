var maxValues = [];

for (var i = 1; i < res[0].length; i++) {
  var values = [];

  for (var j = 1; j < res.length; j++) {
    var cellValue = res[j][i] || 0;

    if (cellValue && typeof cellValue == 'string') {
      cellValue = Number(cellValue.replace(',', '.'))
    }

    res[j][i] = cellValue;

    values.push(Number(cellValue));
  }

  maxValues.push(Math.max.apply(Math, values));
}

console.log('maxValues', maxValues);

var percentSum = [];
var percentAvg = {};

for (var i = 1; i < res.length; i++) {
  var line = res[i];
  var percentValues = [];
  var roundCnt = 0;

  for (var j = 1; j < line.length; j++) {
    if (line[j]) {
      roundCnt++;
      percentValues.push(line[j] / maxValues[j - 1] * 100);
    }
  }

  var percent_sum = percentValues.reduce(function (sum, curr) {
    return sum + curr
  }, 0);

  percentSum.push(percent_sum);

  if (roundCnt > 3) {
    percentAvg[(percent_sum / roundCnt).toFixed(2)] = res[i][0];
  }
}

console.log('percentSum', percentSum);
console.log('percentAvg', percentAvg);
