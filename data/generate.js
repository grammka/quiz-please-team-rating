var fs            = require('fs');
var path          = require('path');
var calculation   = require('./calculate');

var code = 'var data = ' + JSON.stringify(calculation);


fs.writeFile(path.resolve(__dirname, '../client/data.js'), code, function(err) {
	if (err) {
    console.log(err);
  }

  console.log('Data generated successfully!\n');
});
