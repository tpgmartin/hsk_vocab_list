// url used http://www.hsk.academy/en/hsk_1

$table = $('#flat_list');

$rows = $table.find('tr');

words = [];

$rows.each(function (row) {
	var chinese = $($($rows[row]).find('td')[0]).text().split('\n');
	var hanzi = chinese[1].replace(/ /g, '');
	var pinyin = chinese[2].replace(/ /g, '');
	var english = $($($rows[row]).find('td')[1]).text();
	words.push({
		'hanzi': hanzi,
		'pinyin': pinyin,
		'english': english
	});
});

for (var i = 0; i < words.length; i++) {
	console.log(words[i].hanzi);
	console.log(words[i].pinyin);
	console.log(words[i].english);
}

