var CONFIG = require('config').vnstatdb;
var fs = require('fs');

/*
	find lines number in the file and returns them
*/
function getLinesInDatabaseFile(filename, lineNumbers, callback) {
	
	var fileLines = [];
	var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split("\n");
    for(var i=0; i<lines.length; i++) {
		if(lineNumbers.indexOf(i) >= 0) {
			fileLines.push(lines[i])
		}
    }
	
    callback(null, fileLines);
}

function parseLine(line) {
	var data = line.split(";");
	
	var rx = data[3];
	if(data[0] !== "h") {
		rx = rx * 1024 + parseInt(data[5],10);
	}
	
	var tx = data[4];
	if(data[0] !== "h") {
		tx = tx * 1024 + parseInt(data[6],10);
	}
	
	return {
		"rx": rx,
		"tx": tx
	}
	
}


exports.summary = function(req, res) {
	getLinesInDatabaseFile(CONFIG.database_file_location, [2,3,13,43,55,65], function( err, lines) {
		var summary = {
			"interface": lines[0].split(";")[1],
			"nickname": lines[1].split(";")[1]
		}
		summary.hour = parseLine(lines[5]);
		summary.day = parseLine(lines[2]);
		summary.month = parseLine(lines[3]);
		summary.total = parseLine(lines[4]);
		res.send(summary)


	})

}


